"""Rename the two "TU"-suffixed vendor rows and refresh their display names.

Runs the same update app.py's seed data now produces, but as an in-place rename
so the vendor keeps its menu items and any orders that reference its id.

Safe to run repeatedly.
"""
import os
import sqlite3

DB = os.path.join("instance", "wijhah.db")

# (old_id, new_id, new_name_en, new_name_ar)
RENAMES = [
    ("starbucks-tu", "starbucks", "Starbucks", "ستاربكس"),
    ("fresh-shop-tu", "fresh-shop", "Fresh Shop", "فريش شوب"),
]

if not os.path.isfile(DB):
    print("No database at %s - app.py will create it fresh on first run." % DB)
    raise SystemExit(0)

con = sqlite3.connect(DB)
changed = 0

for old_id, new_id, name_en, name_ar in RENAMES:
    row = con.execute("SELECT name_en FROM vendors WHERE id = ?", (old_id,)).fetchone()
    if row is None:
        # Already renamed, or never present.
        exists = con.execute("SELECT 1 FROM vendors WHERE id = ?", (new_id,)).fetchone()
        print("%-16s -> %-12s skipped (already %s)"
              % (old_id, new_id, "present" if exists else "absent"))
        continue

    items = con.execute(
        "SELECT COUNT(*) FROM menu_items WHERE vendor_id = ?", (old_id,)
    ).fetchone()[0]
    # The id is a foreign-key target for menu_items, so update the child rows
    # first, then the parent, inside one transaction.
    con.execute("UPDATE menu_items SET vendor_id = ? WHERE vendor_id = ?", (new_id, old_id))
    con.execute(
        "UPDATE vendors SET id = ?, name_en = ?, name_ar = ? WHERE id = ?",
        (new_id, name_en, name_ar, old_id),
    )
    changed += 1
    print("%-16s -> %-12s renamed (2 menu items kept: %s)"
          % (old_id, new_id, items))

con.commit()

print("\nVendors after migration:")
for row in con.execute("SELECT id, name_en, name_ar FROM vendors ORDER BY id"):
    print("  %-16s | %-18s | %s" % (row[0], row[1], row[2]))

orphans = con.execute(
    "SELECT COUNT(*) FROM menu_items WHERE vendor_id NOT IN (SELECT id FROM vendors)"
).fetchone()[0]
print("\norphaned menu items:", orphans, "(must be 0)")
print("renamed:", changed)

con.close()
