import json, pathlib, shutil, sys

# Usage: python add_new_dishes.py <folder with renamed photos>
if len(sys.argv) != 2:
    sys.exit("Usage: python add_new_dishes.py <folder with renamed photos>")

SRC = pathlib.Path(sys.argv[1])
DEST = pathlib.Path("public/assets/dishes")
DATA = pathlib.Path("src/data/culinaryData.js")
DEST.mkdir(parents=True, exist_ok=True)

# photo file stem -> (state name, era, new dish name)
NEW = {
    "haryana_1700_haryanvi-maheri": ("Haryana", "1700", "Haryanvi Maheri"),
    "chandigarh_1700_punjab-ambala-style-saag-bajra-roti": ("Chandigarh", "1700", "Punjab-Ambala Style Saag & Bajra Roti"),
    "gujarat_1700_kachchhi-kadhi-khichdi-bajra-rotla": ("Gujarat", "1700", "Kachchhi Kadhi-Khichdi & Bajra Rotla"),
    "telangana_1700_jonna-rotte-with-gongura-pachadi": ("Telangana", "1700", "Jonna Rotte with Gongura Pachadi"),
    "goa_1700_goan-fish-curry-rice": ("Goa", "1700", "Goan Fish Curry & Rice"),
    "tripura_1700_tripuri-muya-awandru": ("Tripura", "1700", "Tripuri Muya Awandru"),
    "arunachal-pradesh_1700_monpa-zan-millet-porridge": ("Arunachal Pradesh", "1700", "Monpa Zan (Millet Porridge)"),
    "andaman-and-nicobar-islands_1700_nicobari-fish-yam-coconut-meal": ("Andaman and Nicobar Islands", "1700", "Nicobari Fish, Yam & Coconut Meal"),
    "lakshadweep_1700_minicoy-mus-kavaab": ("Lakshadweep", "1700", "Minicoy Mus Kavaab"),
    "puducherry_1700_tamil-coastal-meen-kuzhambu": ("Puducherry", "1700", "Tamil Coastal Meen Kuzhambu"),
}

# 1. Load the site data
src = DATA.read_text(encoding="utf-8")
A = "export const CULINARY_DATABASE = "
a = src.index(A) + len(A)
b = src.index("export function getStateData")
db = json.loads(src[a:b].strip().rstrip(";"))
shutil.copy(DATA, DATA.with_suffix(".backup.js"))

# 2. Copy each photo, rename its placeholder dish, and link the photo
done = 0
for f in SRC.iterdir():
    if not f.is_file():
        continue
    if f.stem not in NEW:
        print("NOT IN LIST, skipped:", f.name)
        continue
    state_name, era, new_name = NEW[f.stem]
    state = next((s for s in db.values() if s["name"] == state_name), None)
    if state is None:
        print("STATE NOT FOUND:", state_name)
        continue
    dishes = state["eras"][era]["dishes"]
    placeholders = [d for d in dishes if "Simmered Pot" in d["name"]]
    if len(placeholders) != 1:
        print(f"CHECK {state_name} {era}: found {len(placeholders)} placeholders, skipped")
        continue
    shutil.copy(f, DEST / f.name)
    dish = placeholders[0]
    print(f"{state_name} {era}: '{dish['name']}' -> '{new_name}'")
    dish["name"] = new_name
    dish["image"] = f"/assets/dishes/{f.name}"
    done += 1

# 3. Write the data back
DATA.write_text(src[:a] + json.dumps(db, ensure_ascii=False, indent=2) + ";\r\n\r\n" + src[b:],
                encoding="utf-8", newline="")
print(f"\nUpdated {done} of {len(NEW)} dishes. Backup: culinaryData.backup.js")