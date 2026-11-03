import json, pathlib

assets = pathlib.Path("public/assets")
files = [f for f in assets.iterdir() if f.is_file()]   # top level only, not dishes/
src = pathlib.Path("src/data/culinaryData.js").read_text(encoding="utf-8")
A = "export const CULINARY_DATABASE = "
a = src.index(A) + len(A)
b = src.index("export function getStateData")
db = json.loads(src[a:b].strip().rstrip(";"))

for f in files:
    print(f"\n=== {f.name}")
    hits = []
    for s in db.values():
        for era, ed in s["eras"].items():
            for d in ed["dishes"]:
                if d.get("image", "").endswith(f.name):
                    hits.append(f"  {s['name']} | {era} | {d['name']}")
    print("\n".join(hits) if hits else "  (no dish uses it)")

# Also check the other source files, such as the map component, for direct references
for p in pathlib.Path("src").rglob("*.js*"):
    if p.name == "culinaryData.js" or "backup" in p.name:
        continue
    txt = p.read_text(encoding="utf-8", errors="ignore")
    for f in files:
        if f.name in txt:
            print(f"\nREFERENCED IN CODE: {f.name} -> {p}")