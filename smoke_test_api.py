"""Smoke test for the Wijhah / وجهة API using Flask's test client.

Run:  python smoke_test_api.py
"""

import json
from datetime import datetime, timedelta
import app as backend


def main():
    flask_app = backend.app
    with flask_app.app_context():
        backend.db.drop_all()
        backend.db.create_all()
        backend.seed_buildings()
        backend.seed_vendors()

    client = flask_app.test_client()

    print("== GET /api/buildings ==")
    resp = client.get("/api/buildings")
    buildings = resp.get_json()
    print("status:", resp.status_code, "| count:", len(buildings))
    print("first:", json.dumps(buildings[0], ensure_ascii=False))
    print("b16:", json.dumps(next(b for b in buildings if b["id"] == 16), ensure_ascii=False))
    assert resp.status_code == 200
    assert len(buildings) == 26  # buildings 2..27
    print("\n== GET /api/vendors ==")
    resp = client.get("/api/vendors")
    vendors = resp.get_json()
    print("status:", resp.status_code, "| count:", len(vendors))
    for v in vendors:
        print(" ", v["id"], "|", v["name"]["en"], "/", v["name"]["ar"], "| menu:", len(v["menu"]))
    assert resp.status_code == 200
    assert len(vendors) == 6, len(vendors)
    expected_ids = {
        "fandeer-coffee", "starbucks", "dr-dotri",
        "fresh-shop", "judy", "karaz-al-bunn",
    }
    assert {v["id"] for v in vendors} == expected_ids, {v["id"] for v in vendors}
    assert all(v["building_id"] == 16 for v in vendors)

    print("\n== POST /api/orders (valid) ==")
    payload = {
        "customer_name": "Shahad",
        "customer_email": "shahad@example.com",
        "customer_phone": "0512345678",
        "building_id": 16,
        "items": [
            {"item_name": "Crispy chicken sandwich", "quantity": 2, "price": 22},
            {"item_name": "Seasoned fries", "quantity": 1, "price": 8},
        ],
    }
    resp = client.post("/api/orders", json=payload)
    order = resp.get_json()
    print("status:", resp.status_code)
    print("order:", json.dumps(order, ensure_ascii=False))
    assert resp.status_code == 201
    # 2*22 + 1*8 = 52 subtotal; building 16 => fee 0; total 52
    assert order["subtotal"] == 52, order["subtotal"]
    assert order["delivery_fee"] == 0, order["delivery_fee"]
    assert order["total"] == 52, order["total"]
    assert order["status"] == "placed"
    # the local 05XXXXXXXX form is stored in its canonical +9665XXXXXXXX shape
    assert order["customer_phone"] == "+966512345678", order["customer_phone"]
    order_id = order["id"]

    print("\n== server ignores client-supplied price tampering ==")
    tampered = {
        "customer_name": "Tester",
        "customer_email": "tester@example.com",
        "customer_phone": "+966500000123",
        "building_id": 5,  # fee 5
        "items": [{"item_name": "Latte", "quantity": 3, "price": 12}],
        "subtotal": 1,      # should be ignored
        "delivery_fee": 999,  # should be ignored
        "total": 1,         # should be ignored
    }
    resp = client.post("/api/orders", json=tampered)
    order2 = resp.get_json()
    assert order2["subtotal"] == 36, order2["subtotal"]
    assert order2["delivery_fee"] == 5, order2["delivery_fee"]
    assert order2["total"] == 41, order2["total"]
    print("computed subtotal/fee/total:", order2["subtotal"], order2["delivery_fee"], order2["total"])

    print("\n== GET /api/orders/<id> ==")
    resp = client.get(f"/api/orders/{order_id}")
    fetched = resp.get_json()
    print("status:", resp.status_code, "| id:", fetched["id"], "| status:", fetched["status"])
    assert resp.status_code == 200
    assert fetched["id"] == order_id

    print("\n== PATCH status then re-fetch ==")
    resp = client.patch(f"/api/orders/{order_id}", json={"status": "out_for_delivery"})
    assert resp.status_code == 200
    resp = client.get(f"/api/orders/{order_id}")
    assert resp.get_json()["status"] == "out_for_delivery"
    print("status advanced to:", resp.get_json()["status"])

    print("\n== validation errors ==")
    r = client.post("/api/orders", json={"customer_email": "a@b.co", "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
    assert r.status_code == 400, r.status_code
    print("missing customer_name ->", r.status_code, r.get_json())

    # customer_email is now required
    r = client.post("/api/orders", json={"customer_name": "A", "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
    assert r.status_code == 400, r.status_code
    print("missing customer_email ->", r.status_code, r.get_json())

    # and must look like an email
    for bad in ["not-an-email", "a@b", "a b@c.com", "@example.com", "a@@b.com"]:
        r = client.post("/api/orders", json={"customer_name": "A", "customer_email": bad, "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
        assert r.status_code == 400, (bad, r.status_code)
        print(f"invalid email {bad!r} ->", r.status_code, r.get_json())

    # customer_phone is now required and must be a Saudi mobile number
    r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
    assert r.status_code == 400, r.status_code
    print("missing customer_phone ->", r.status_code, r.get_json())

    for bad in ["051234567", "05123456789", "0612345678", "+96612345678", "051234567a", "966512345678"]:
        r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "customer_phone": bad, "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
        assert r.status_code == 400, (bad, r.status_code)
        print(f"invalid phone {bad!r} ->", r.status_code)

    # both accepted shapes normalize to the same stored value
    for good in ["0512345678", "+966512345678", "051 234 5678"]:
        r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "customer_phone": good, "building_id": 16, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
        assert r.status_code == 201, (good, r.status_code, r.get_json())
        stored = r.get_json()["customer_phone"]
        assert stored == "+966512345678", (good, stored)
        print(f"valid phone {good!r} ->", r.status_code, "stored as", stored)

    r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "customer_phone": "0512345678", "building_id": 999, "items": [{"item_name": "x", "quantity": 1, "price": 1}]})
    assert r.status_code == 400, r.status_code
    print("unknown building ->", r.status_code, r.get_json())

    r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "customer_phone": "0512345678", "building_id": 16, "items": []})
    assert r.status_code == 400, r.status_code
    print("empty items ->", r.status_code, r.get_json())

    r = client.post("/api/orders", json={"customer_name": "A", "customer_email": "a@b.co", "customer_phone": "0512345678", "building_id": 16, "items": [{"item_name": "x", "quantity": 0, "price": 5}]})
    assert r.status_code == 400, r.status_code
    print("zero quantity ->", r.status_code, r.get_json())

    r = client.get("/api/orders/WJ-NOPE00")
    assert r.status_code == 404, r.status_code
    print("missing order ->", r.status_code, r.get_json())

    print("\n== time-based auto-advance ==")
    # Build a fresh order and inspect effective_status at simulated ages.
    with flask_app.app_context():
        auto = backend.Order(
            id="WJ-AUTO01", customer_name="Auto", customer_email="auto@example.com",
            customer_phone="+966500000001",
            building_id=16, subtotal=10, delivery_fee=0, total=10, status="placed",
            created_at=datetime.utcnow(),
        )
        backend.db.session.add(auto)
        backend.db.session.commit()

        step = backend.AUTO_ADVANCE_SECONDS
        cases = [
            (0, "placed"),
            (step - 1, "placed"),
            (step, "preparing"),
            (step * 2, "out_for_delivery"),
            (step * 3, "delivered"),
            (step * 50, "delivered"),  # never advances past delivered
        ]
        for elapsed, expected in cases:
            auto.created_at = datetime.utcnow() - timedelta(seconds=elapsed)
            backend.db.session.commit()
            actual = auto.effective_status()
            assert actual == expected, (elapsed, actual, expected)
            print(f"  t+{elapsed:>4}s -> {actual}")

        # a manual status acts as a floor and is never reverted by auto-advance
        auto.created_at = datetime.utcnow()
        auto.status = "out_for_delivery"
        backend.db.session.commit()
        assert auto.effective_status() == "out_for_delivery"
        print("  manual out_for_delivery at t+0 stays out_for_delivery")

    print("\nALL SMOKE TESTS PASSED")


if __name__ == "__main__":
    main()
