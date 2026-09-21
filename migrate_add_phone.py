"""Additive migration: add orders.customer_phone if it is missing.

Safe to run repeatedly. Existing rows keep their data; the new column is
nullable so old orders (created before the phone field existed) stay valid.
"""
import os
import sqlite3

DB = os.path.join("instance", "wijhah.db")

if not os.path.isfile(DB):
    print("No database at %s - it will be created fresh by app.py on first run." % DB)
    raise SystemExit(0)

con = sqlite3.connect(DB)
cols = [row[1] for row in con.execute("PRAGMA table_info(orders)")]
print("orders columns before:", cols)

if "customer_phone" in cols:
    print("customer_phone already present - nothing to do.")
else:
    before = con.execute("SELECT COUNT(*) FROM orders").fetchone()[0]
    con.execute("ALTER TABLE orders ADD COLUMN customer_phone VARCHAR(20)")
    con.commit()
    after = con.execute("SELECT COUNT(*) FROM orders").fetchone()[0]
    print("added column customer_phone")
    print("rows preserved: %s -> %s" % (before, after))

cols = [row[1] for row in con.execute("PRAGMA table_info(orders)")]
print("orders columns after :", cols)
con.close()
