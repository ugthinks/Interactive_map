import json, pathlib, shutil

manifest = json.load(open("image_manifest.json", encoding="utf-8"))
index = {(m["state"], m["era"], m["dish"]): m for m in manifest.values() if m.get("status") == "FOUND"}

path = pathlib.Path("src/data/culinaryData.js")
src = path.read_text(encoding="utf-8")
shutil.copy(path, path.with_suffix(".backup.js"))

A = "export const CULINARY_DATABASE = "
a = src.index(A) + len(A)
b = src.index("export function getStateData")
db = json.loads(src[a:b].strip().rstrip(";"))

applied = 0
for state in db.values():
    for era, ed in state["eras"].items():
        for dish in ed["dishes"]:
            key = (state["name"], era, dish["name"])
            if key in index:
                dish["image"] = index[key]["image"]
                applied += 1

path.write_text(src[:a] + json.dumps(db, ensure_ascii=False, indent=2) + ";\r\n\r\n" + src[b:],
                encoding="utf-8", newline="")
print(f"Applied {applied} images. Backup saved as culinaryData.backup.js")