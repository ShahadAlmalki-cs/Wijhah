"""Wijhah / وجهة backend API - Flask + SQLite.

Run locally:
    pip install -r requirements.txt
    python app.py
"""

import re
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wijhah.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

ORDER_STATUSES = ("placed", "preparing", "out_for_delivery", "delivered")

# Demo only: no real courier, so orders advance one step on their own.
AUTO_ADVANCE_SECONDS = 17
# Mirrors getDeliveryFee() in script.js.
BUILDING_FEE_NEAR = 5
BUILDING_FEE_FAR = 10
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# Saudi mobile: 05XXXXXXXX or +9665XXXXXXXX.
PHONE_RE = re.compile(r"^(?:\+9665|05)\d{8}$")


def is_valid_email(email: str) -> bool:
    return bool(EMAIL_RE.match(email or ""))


def is_valid_saudi_phone(phone: str) -> bool:
    if not phone:
        return False
    cleaned = re.sub(r"[\s\-()]", "", phone.strip())
    return bool(PHONE_RE.match(cleaned))


def normalize_phone(phone: str) -> str:
    cleaned = re.sub(r"[\s\-()]", "", (phone or "").strip())
    if cleaned.startswith("05"):
        return "+966" + cleaned[1:]
    return cleaned


def delivery_fee_for(building_number: int) -> int:
    """Delivery fee in SAR for a campus building number."""
    if building_number == 16:
        return 0
    if building_number <= 15:
        return BUILDING_FEE_NEAR
    return BUILDING_FEE_FAR


# Models

class Building(db.Model):
    __tablename__ = "buildings"

    id = db.Column(db.Integer, primary_key=True)  # campus building number (2-27)
    name_en = db.Column(db.String(120), nullable=False)
    name_ar = db.Column(db.String(120), nullable=False)
    delivery_fee = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name_en": self.name_en,
            "name_ar": self.name_ar,
            "delivery_fee": self.delivery_fee,
        }


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.String(16), primary_key=True)  # e.g. "WJ-7K2M9Q"
    customer_name = db.Column(db.String(120), nullable=False)
    customer_email = db.Column(db.String(120), nullable=True)
    customer_phone = db.Column(db.String(20), nullable=True)  # normalized +9665XXXXXXXX
    building_id = db.Column(db.Integer, db.ForeignKey("buildings.id"), nullable=False)
    subtotal = db.Column(db.Integer, nullable=False)
    delivery_fee = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(24), nullable=False, default="placed")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    items = db.relationship(
        "OrderItem", backref="order", cascade="all, delete-orphan", lazy=True
    )

    def effective_status(self):
        """Status including demo auto-advance, floored by any manual PATCH."""
        stored_index = ORDER_STATUSES.index(self.status) if self.status in ORDER_STATUSES else 0
        elapsed = (datetime.utcnow() - self.created_at).total_seconds()
        auto_index = int(elapsed // AUTO_ADVANCE_SECONDS)
        return ORDER_STATUSES[min(max(stored_index, auto_index), len(ORDER_STATUSES) - 1)]

    def to_dict(self):
        building = Building.query.get(self.building_id)
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "customer_email": self.customer_email,
            "customer_phone": self.customer_phone,
            "building_id": self.building_id,
            "building_name_en": building.name_en if building else None,
            "building_name_ar": building.name_ar if building else None,
            "subtotal": self.subtotal,
            "delivery_fee": self.delivery_fee,
            "total": self.total,
            "status": self.effective_status(),
            "created_at": self.created_at.isoformat() + "Z",
            "items": [item.to_dict() for item in self.items],
        }


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.String(16), db.ForeignKey("orders.id"), nullable=False)
    item_name = db.Column(db.String(160), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)  # unit price in SAR
    def to_dict(self):
        return {
            "id": self.id,
            "item_name": self.item_name,
            "quantity": self.quantity,
            "price": self.price,
            "line_total": self.price * self.quantity,
        }

class Vendor(db.Model):
    __tablename__ = "vendors"

    id = db.Column(db.String(40), primary_key=True)  # slug, e.g. "fandeer-coffee"
    name_en = db.Column(db.String(120), nullable=False)
    name_ar = db.Column(db.String(120), nullable=False)
    category_en = db.Column(db.String(120), nullable=False)
    category_ar = db.Column(db.String(120), nullable=False)
    building_id = db.Column(db.Integer, db.ForeignKey("buildings.id"), nullable=False)
    eta = db.Column(db.Integer, nullable=False)  # estimated minutes
    accent = db.Column(db.String(20), nullable=False, default="gold")

    menu_items = db.relationship(
        "MenuItem", backref="vendor", cascade="all, delete-orphan", lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": {"en": self.name_en, "ar": self.name_ar},
            "category": {"en": self.category_en, "ar": self.category_ar},
            "building_id": self.building_id,
            "eta": self.eta,
            "accent": self.accent,
            "menu": [item.to_dict() for item in self.menu_items],
        }

class MenuItem(db.Model):
    __tablename__ = "menu_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    vendor_id = db.Column(db.String(40), db.ForeignKey("vendors.id"), nullable=False)
    slug = db.Column(db.String(60), nullable=False)  # stable id within a vendor
    name_en = db.Column(db.String(160), nullable=False)
    name_ar = db.Column(db.String(160), nullable=False)
    description_en = db.Column(db.String(240), nullable=False)
    description_ar = db.Column(db.String(240), nullable=False)
    price = db.Column(db.Integer, nullable=False)  # unit price in SAR
    def to_dict(self):
        return {
            "id": self.slug,
            "name": {"en": self.name_en, "ar": self.name_ar},
            "description": {"en": self.description_en, "ar": self.description_ar},
            "price": self.price,
        }


# Seeding

# Canonical campus building names, matching buildingNames in script.js.
BUILDING_NAMES = {
    2: ("College of Education", "كلية التربية"),
    3: ("College of Science", "كلية العلوم"),
    4: ("College of Medicine", "كلية الطب"),
    5: ("College of Business Administration", "كلية إدارة الأعمال"),
    6: ("College of Sharia and Regulations", "كلية الشريعة والأنظمة"),
    7: ("College of Medicine Labs", "معامل كلية الطب"),
    8: ("College of Pharmacy", "كلية الصيدلة"),
    9: ("Computer College Labs", "معامل كلية الحاسبات"),
    10: ("College of Applied Medical Sciences", "كلية العلوم الطبية التطبيقية"),
    11: ("Classrooms (A)", "الفصول الدراسية (أ)"),
    12: ("Classrooms (B)", "الفصول الدراسية (ب)"),
    13: ("College of Designs and Home Economics", "كلية التصاميم والاقتصاد المنزلي"),
    14: ("College of Computers and Information Technology", "كلية الحاسبات وتقنية المعلومات"),
    15: ("Deanship of University Studies", "عمادة الدراسات الجامعية"),
    16: ("Eastern Student Entrance (A)", "مدخل الطالبات الشرقي (أ)"),
    17: ("Deanship of Admission and Registration", "عمادة القبول والتسجيل"),
    18: ("Classrooms (C)", "الفصول الدراسية (ج)"),
    19: ("Grand Lecture Hall (Theatre)", "قاعة المحاضرات الكبرى (المسرح)"),
    20: ("Student Affairs Building", "مبنى شؤون الطالبات"),
    21: ("College of Pharmacy Labs", "معامل كلية الصيدلة"),
    22: ("Medical Sciences Building", "مبنى العلوم الطبية"),
    23: ("Deanship of Graduate Studies", "عمادة الدراسات العليا"),
    24: ("Campus building", "مبنى جامعي"),
    25: ("Campus building", "مبنى جامعي"),
    26: ("Campus building", "مبنى جامعي"),
    27: ("Campus building", "مبنى جامعي"),
}


def seed_buildings():
    """Insert the building directory once. Safe to call on every startup."""
    if Building.query.count() > 0:
        return
    for number, (name_en, name_ar) in BUILDING_NAMES.items():
        db.session.add(
            Building(
                id=number,
                name_en=name_en,
                name_ar=name_ar,
                delivery_fee=delivery_fee_for(number),
            )
        )
    db.session.commit()

# Taif University campus vendors. Menu entries are:
# (slug, name_en, name_ar, description_en, description_ar, price)
VENDOR_SEED = [
                    {
                        "id": "fandeer-coffee",
                        "name_en": "Fandeer Coffee",
                        "name_ar": "فندير كافيه",
                        "category_en": "Coffee & Breakfast",
                        "category_ar": "قهوة وفطور",
                        "eta": 10,
                        "accent": "gold",
                        "menu": [
                            ("flat-white", "Flat white", "فلات وايت", "Double espresso with silky milk", "إسبريسو مزدوج مع حليب مخملي", 14),
                            ("v60", "V60 pour over", "V60 مقطر", "Hand-brewed single origin filter", "قهوة مقطرة يدوياً من أصل واحد", 18),
                            ("cheese-croissant", "Cheese croissant", "كرواسون بالجبن", "Butter croissant baked with cheese", "كرواسون بالزبدة مخبوز مع الجبن", 13),
                            ("breakfast-wrap", "Breakfast wrap", "راب الفطور", "Egg, cheese and turkey in a warm wrap", "بيض وجبن وديك رومي في خبز راب", 19),
                        ],
                    },
                    {
                        "id": "starbucks",
                        "name_en": "Starbucks",
                        "name_ar": "ستاربكس",
                        "category_en": "Coffee & Drinks",
                        "category_ar": "قهوة ومشروبات",
                        "eta": 12,
                        "accent": "mint",
                        "menu": [
                            ("caramel-macchiato", "Caramel macchiato", "كراميل ماكياتو", "Espresso, milk and caramel drizzle", "إسبريسو وحليب مع كراميل", 19),
                            ("iced-latte", "Iced latte", "لاتيه مثلج", "Chilled espresso with milk over ice", "إسبريسو بارد مع حليب وثلج", 16),
                            ("cold-brew", "Cold brew", "كولد برو", "Slow-steeped cold coffee", "قهوة باردة منقوعة ببطء", 17),
                            ("croissant", "Butter croissant", "كرواسون بالزبدة", "Freshly baked flaky croissant", "كرواسون طازج مقرمش", 11),
                        ],
                    },
                    {
                        "id": "dr-dotri",
                        "name_en": "Dr. Dotri",
                        "name_ar": "د.دوتري",
                        "category_en": "Desserts & Bakeries",
                        "category_ar": "حلويات ومخبوزات",
                        "eta": 14,
                        "accent": "coral",
                        "menu": [
                            ("cheesecake", "Mini cheesecake", "تشيزكيك صغير", "Creamy cheesecake with berry sauce", "تشيزكيك كريمي مع صلصة التوت", 18),
                            ("chocolate-cake", "Chocolate fudge cake", "كيكة الشوكولاتة", "Rich chocolate slice", "قطعة كيك شوكولاتة غنية", 20),
                            ("cookie", "Chocolate chip cookie", "كوكيز الشوكولاتة", "Soft-baked cookie with chocolate chips", "كوكيز طري مع رقائق الشوكولاتة", 9),
                            ("cinnamon-roll", "Cinnamon roll", "سينامون رول", "Baked roll with cinnamon glaze", "لفافة مخبوزة مع صلصة القرفة", 15),
                        ],
                    },
                    {
                        "id": "fresh-shop",
                        "name_en": "Fresh Shop",
                        "name_ar": "فريش شوب",
                        "category_en": "Sandwiches & Quick bites",
                        "category_ar": "ساندويتشات ووجبات سريعة",
                        "eta": 15,
                        "accent": "blue",
                        "menu": [
                            ("chicken-sandwich", "Grilled chicken sandwich", "ساندويتش دجاج مشوي", "Grilled chicken, lettuce and sauce", "دجاج مشوي مع خس وصلصة", 22),
                            ("turkey-sandwich", "Turkey & cheese sandwich", "ساندويتش ديك رومي بالجبن", "Turkey, cheese and fresh greens", "ديك رومي وجبن وخضار طازجة", 20),
                            ("fries", "Seasoned fries", "بطاطس متبلة", "Crispy fries with house seasoning", "بطاطس مقرمشة بتتبيلة خاصة", 10),
                            ("veggie-wrap", "Veggie wrap", "راب نباتي", "Seasonal vegetables in a soft wrap", "خضار موسمية في خبز راب", 17),
                        ],
                    },
                    {
                        "id": "judy",
                        "name_en": "Judy",
                        "name_ar": "جودي",
                        "category_en": "Meals & Snacks",
                        "category_ar": "وجبات ومسكبات",
                        "eta": 16,
                        "accent": "gold",
                        "menu": [
                            ("chicken-bowl", "Chicken rice bowl", "وعاء دجاج باللحم", "Rice with grilled chicken and sides", "أرز مع دجاج مشوي وإضافات", 26),
                            ("shawarma", "Chicken shawarma", "شاورما دجاج", "Wrapped shawarma with garlic sauce", "شاورما مع صوص الثوم", 16),
                            ("samosa", "Samosa (3 pcs)", "سمبوسة (٣ حبات)", "Crispy savory pastries", "معجنات مقرمشة محشوة", 8),
                            ("salad", "Garden salad", "سلطة الخضار", "Fresh salad with a light dressing", "سلطة طازجة بصلصة خفيفة", 14),
                        ],
                    },
                    {
                        "id": "karaz-al-bunn",
                        "name_en": "Karaz Al-Bunn",
                        "name_ar": "كرز البن",
                        "category_en": "Specialty Coffee",
                        "category_ar": "قهوة مختصة",
                        "eta": 11,
                        "accent": "mint",
                        "menu": [
                            ("spanish-latte", "Spanish latte", "سبانيش لاتيه", "Espresso with sweet condensed milk", "إسبريسو مع حليب مكثف محلى", 17),
                            ("turkish-coffee", "Turkish coffee", "قهوة تركية", "Traditional finely ground coffee", "قهوة تركية مطحونة ناعماً", 12),
                            ("cortado", "Cortado", "كورتادو", "Equal parts espresso and steamed milk", "إسبريسو وحليب مبخر بالتساوي", 13),
                            ("americano", "Americano", "أمريكانو", "Espresso with hot water", "إسبريسو مع ماء ساخن", 11),
                        ],
                    },
                ]


def seed_vendors():
    """Insert the campus vendors and their menus once. Safe to call repeatedly."""
    if Vendor.query.count() > 0:
        return
    for vendor in VENDOR_SEED:
        record = Vendor(
            id=vendor["id"],
            name_en=vendor["name_en"],
            name_ar=vendor["name_ar"],
            category_en=vendor["category_en"],
            category_ar=vendor["category_ar"],
            building_id=16,
            eta=vendor["eta"],
            accent=vendor["accent"],
        )
        for slug, name_en, name_ar, desc_en, desc_ar, price in vendor["menu"]:
            record.menu_items.append(
                MenuItem(
                    slug=slug,
                    name_en=name_en,
                    name_ar=name_ar,
                    description_en=desc_en,
                    description_ar=desc_ar,
                    price=price,
                )
            )
        db.session.add(record)
    db.session.commit()

# Endpoints

@app.get("/api/vendors")
def list_vendors():
    """Campus vendors and their menus, ready for the frontend to render."""
    vendors = Vendor.query.order_by(Vendor.id).all()
    return jsonify([vendor.to_dict() for vendor in vendors])

@app.get("/api/buildings")
def list_buildings():
    buildings = Building.query.order_by(Building.id).all()
    return jsonify([building.to_dict() for building in buildings])


def _generate_order_id() -> str:
    """A short, human-readable, collision-resistant order id, e.g. WJ-7K2M9Q."""
    import random
    import string

    alphabet = string.ascii_uppercase + string.digits
    while True:
        candidate = "WJ-" + "".join(random.choices(alphabet, k=6))
        if not Order.query.get(candidate):
            return candidate


@app.post("/api/orders")
def create_order():
    payload = request.get_json(silent=True) or {}

    customer_name = (payload.get("customer_name") or "").strip()
    customer_email = (payload.get("customer_email") or "").strip() or None
    customer_phone = (payload.get("customer_phone") or "").strip() or None
    building_id = payload.get("building_id")
    cart = payload.get("items")

    # Validation
    if not customer_name:
        return jsonify({"error": "customer_name is required"}), 400
    if not customer_email:
        return jsonify({"error": "customer_email is required"}), 400
    if not is_valid_email(customer_email):
        return jsonify({"error": "customer_email must be a valid email address"}), 400
    if not customer_phone:
        return jsonify({"error": "customer_phone is required"}), 400
    if not is_valid_saudi_phone(customer_phone):
        return (
            jsonify(
                {
                    "error": (
                        "customer_phone must be a Saudi mobile number "
                        "(05XXXXXXXX or +9665XXXXXXXX)"
                    )
                }
            ),
            400,
        )
    customer_phone = normalize_phone(customer_phone)
    try:
        building_id = int(building_id)
    except (TypeError, ValueError):
        return jsonify({"error": "building_id must be a number"}), 400

    building = Building.query.get(building_id)
    if building is None:
        return jsonify({"error": f"Unknown building_id {building_id}"}), 400

    if not isinstance(cart, list) or not cart:
        return jsonify({"error": "items must be a non-empty list"}), 400

    # Totals are always computed here, never taken from the request body.
    items = []
    subtotal = 0
    for entry in cart:
        if not isinstance(entry, dict):
            return jsonify({"error": "each item must be an object"}), 400

        item_name = (entry.get("item_name") or "").strip()
        try:
            quantity = int(entry.get("quantity"))
            price = int(entry.get("price"))
        except (TypeError, ValueError):
            return jsonify({"error": "item quantity and price must be integers"}), 400

        if not item_name:
            return jsonify({"error": "each item needs an item_name"}), 400
        if quantity <= 0:
            return jsonify({"error": "item quantity must be greater than zero"}), 400
        if price < 0:
            return jsonify({"error": "item price cannot be negative"}), 400

        items.append(OrderItem(item_name=item_name, quantity=quantity, price=price))
        subtotal += price * quantity

    delivery_fee = building.delivery_fee
    total = subtotal + delivery_fee

    order = Order(
        id=_generate_order_id(),
        customer_name=customer_name,
        customer_email=customer_email,
        customer_phone=customer_phone,
        building_id=building_id,
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        total=total,
        status="placed",
    )
    order.items = items

    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201


@app.get("/api/orders/<order_id>")
def get_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({"error": f"Order {order_id} not found"}), 404
    return jsonify(order.to_dict())


@app.patch("/api/orders/<order_id>")
def update_order_status(order_id):
    """Advance an order's status. Used by staff tooling / testing the tracker."""
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({"error": f"Order {order_id} not found"}), 404

    payload = request.get_json(silent=True) or {}
    status = (payload.get("status") or "").strip()
    if status not in ORDER_STATUSES:
        return (
            jsonify({"error": f"status must be one of {list(ORDER_STATUSES)}"}),
            400,
        )

    order.status = status
    db.session.commit()
    return jsonify(order.to_dict())


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_buildings()
        seed_vendors()
    app.run(debug=True, port=5000)
