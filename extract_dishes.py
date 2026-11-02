import json, re, pathlib

src = pathlib.Path("src/data/culinaryData.js").read_text(encoding="utf-8")
A = "export const CULINARY_DATABASE = "
a = src.index(A) + len(A)
b = src.index("export function getStateData")
db = json.loads(src[a:b].strip().rstrip(";"))

dishes = []
for state_id, state in db.items():
    for era_id, era in state.get("eras", {}).items():
        # Check dishes array
        for idx, d in enumerate(era.get("dishes", [])):
            dishes.append({
                "state_id": state_id,
                "state_name": state.get("name", state_id),
                "era": era_id,
                "type": f"card_{idx}",
                "dish_name": d.get("name", ""),
                "image": d.get("image", ""),
                "tag": d.get("tag", ""),
                "description": d.get("description", ""),
                "regionalOrigin": d.get("regionalOrigin", "")
            })
        # Check signature dish
        dishes.append({
            "state_id": state_id,
            "state_name": state.get("name", state_id),
            "era": era_id,
            "type": "signature",
            "dish_name": era.get("signatureDish", ""),
            "image": era.get("signatureImage", ""),
            "tag": "Signature",
            "description": era.get("signatureFlavor", ""),
            "regionalOrigin": state.get("name", state_id)
        })

print(f"Total entries: {len(dishes)}")
with open("all_dishes_inventory.json", "w", encoding="utf-8") as f:
    json.dump(dishes, f, indent=2, ensure_ascii=False)
print("Saved all_dishes_inventory.json")

