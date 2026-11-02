import json, pathlib, shutil, sys

# Usage: python update_dish_images.py path\to\renamed_all
if len(sys.argv) != 2:
    sys.exit("Usage: python update_dish_images.py <folder with renamed photos>")

SRC = pathlib.Path(sys.argv[1])
DEST = pathlib.Path("public/assets/dishes")
DATA = pathlib.Path("src/data/culinaryData.js")
DEST.mkdir(parents=True, exist_ok=True)

# 1. Map every dish key to its state, era and name
dish_list = json.load(open("dish_list.json", encoding="utf-8"))
by_key = {d["key"]: d for d in dish_list}

# 2. Copy the photos and record which dish each one belongs to
photos = {}
for f in SRC.iterdir():
    if not f.is_file():
        continue
    key = f.stem
    if key not in by_key:
        print("UNKNOWN KEY, skipped:", f.name)
        continue
    if f.resolve() != (DEST / f.name).resolve():
        shutil.copy(f, DEST / f.name)
    d = by_key[key]
    photos[(d["state"], d["era"], d["dish"])] = f"/assets/dishes/{f.name}"
print(f"Copied {len(photos)} photos to {DEST}")

# 3. Back up culinaryData.js, then update the image field of each matching dish
shutil.copy(DATA, DATA.with_suffix(".backup.js"))
src = DATA.read_text(encoding="utf-8")
A = "export const CULINARY_DATABASE = "
a = src.index(A) + len(A)
b = src.index("export function getStateData")
db = json.loads(src[a:b].strip().rstrip(";"))

updated = 0
for state in db.values():
    for era, ed in state["eras"].items():
        for dish in ed["dishes"]:
            path = photos.get((state["name"], era, dish["name"]))
            if path:
                dish["image"] = path
                updated += 1

DATA.write_text(src[:a] + json.dumps(db, ensure_ascii=False, indent=2) + ";\r\n\r\n" + src[b:],
                encoding="utf-8", newline="")
print(f"Updated {updated} dishes in culinaryData.js. Backup: culinaryData.backup.js")