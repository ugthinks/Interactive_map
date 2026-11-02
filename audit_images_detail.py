import os, pathlib
from PIL import Image

dish_dir = pathlib.Path("public/assets/dishes")
files = list(dish_dir.iterdir())
print(f"Total files in public/assets/dishes: {len(files)}")

suspicious = []
for f in sorted(files):
    if not f.is_file(): continue
    sz = f.stat().st_size
    try:
        with Image.open(f) as im:
            w, h = im.size
            fmt = im.format
            # Tiny files, weird aspect ratios, or small sizes
            if sz < 10000 or w < 200 or h < 200:
                suspicious.append((f.name, sz, w, h, fmt, "very small or low res"))
    except Exception as e:
        suspicious.append((f.name, sz, 0, 0, "ERR", str(e)))

print(f"\nSuspicious/very small images ({len(suspicious)}):")
for item in suspicious:
    print(item)

