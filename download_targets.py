import requests, pathlib
from PIL import Image
import io

HEADERS_COMMONS = {'User-Agent': 'CulinaryAtlasIndia/2.0 (contact: project@culinaryatlas.org)'}
HEADERS_GENERIC = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

TARGETS = [
    {
        "key": "sikkim_2020_buckwheat-heritage-revival",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Phapar_Ko_Roti_Pendam_Sikkim_India.jpg/1280px-Phapar_Ko_Roti_Pendam_Sikkim_India.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["sikkim_2020_buckwheat-heritage-revival.png", "sikkim_2020_buckwheat-heritage-revival.jpg"]
    },
    {
        "key": "manipur_1980_manipuri-fish-curry",
        "url": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Nga_Ataoba_Thongba_%28Taothong%29_-_a_type_of_Nga_Thongba_%28fish_curry%29_-_Traditional_Meitei_cuisine_-_Gastronomic_cultural_heritage_of_Manipur_%26_domestic_and_international_Meitei_diasporas.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
        "headers": HEADERS_COMMONS,
        "filenames": ["manipur_1980_manipuri-fish-curry.png", "manipur_1980_manipuri-fish-curry.jpg"]
    },
    {
        "key": "manipur_1947_ngari",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Ngari-fish.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
        "headers": HEADERS_COMMONS,
        "filenames": ["manipur_1947_ngari.jpg", "manipur_1947_ngari.png"]
    },
    {
        "key": "manipur_2020_black-rice-heritage-revival",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Chahao_kheer.jpg/1280px-Chahao_kheer.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["manipur_2020_black-rice-heritage-revival.jpg", "manipur_2020_black-rice-heritage-revival.png"]
    },
    {
        "key": "nagaland_1947_galho",
        "url": "https://www.pavaniskitchen.com/wp-content/uploads/2019/04/Naga-Galho-1-665-x-435.jpg",
        "headers": HEADERS_GENERIC,
        "filenames": ["nagaland_1947_galho.jpg", "nagaland_1947_galho.png"]
    },
    {
        "key": "chhattisgarh_1765_chila",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Chilla_with_chutney.jpg/1280px-Chilla_with_chutney.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["chhattisgarh_1765_chila.jpg", "chhattisgarh_1765_chila.png"]
    },
    {
        "key": "chhattisgarh_1857_faraa",
        "url": "https://themadscientistskitchen.com/wp-content/uploads/2023/08/Easy-Fara-Recipe-1.jpg",
        "headers": HEADERS_GENERIC,
        "filenames": ["chhattisgarh_1857_faraa.jpg", "chhattisgarh_1857_faraa.png"]
    },
    {
        "key": "west-bengal_1700_royal-west-bengal-simmered-pot",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Shukto%2C_a_Bengali_dish.jpg/1280px-Shukto%2C_a_Bengali_dish.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["west-bengal_1700_royal-west-bengal-simmered-pot.jpg", "west-bengal_1700_traditional-bengali-shukto.jpg"]
    },
    {
        "key": "gujarat_1980_khandvi",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Khandvi_%2810497367994%29.jpg/1280px-Khandvi_%2810497367994%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["gujarat_1980_khandvi.jpg", "gujarat_1980_khandvi.png"]
    },
    {
        "key": "himachal-pradesh_1911_madra",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/White_Chana_Madra.jpg/1280px-White_Chana_Madra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["himachal-pradesh_1911_madra.png", "himachal-pradesh_1911_madra.jpg"]
    },
    {
        "key": "himachal-pradesh_1857_chha-gosht",
        "url": "https://img-cdn.publive.online/fit-in/1200x675/sanjeev-kapoor/media/media_files/2025/04/25/fOQZq87mG7Xon8XKEtrD.jpg",
        "headers": HEADERS_GENERIC,
        "filenames": ["himachal-pradesh_1857_chha-gosht.jpg", "himachal-pradesh_1857_chha-gosht.png"]
    },
    {
        "key": "ladakh_1765_skyu",
        "url": "https://i0.wp.com/purvanchaltadka.com/wp-content/uploads/2022/05/20220203_174038-01-1.jpeg",
        "headers": HEADERS_GENERIC,
        "filenames": ["ladakh_1765_skyu.jpg", "ladakh_1765_skyu.png"]
    },
    {
        "key": "rajasthan_1700_traditional-royal-ker-sangri",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Ker_Sangri.jpg/1280px-Ker_Sangri.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        "headers": HEADERS_COMMONS,
        "filenames": ["rajasthan_1700_traditional-royal-ker-sangri.webp", "rajasthan_1700_traditional-royal-ker-sangri.jpg"]
    }
]

out_dir = pathlib.Path("public/assets/dishes")

for t in TARGETS:
    print(f"Downloading for {t['key']} from {t['url']}...")
    try:
        r = requests.get(t['url'], headers=t['headers'], timeout=25)
        if r.status_code != 200 or len(r.content) < 1000:
            print(f"FAILED (status {r.status_code}, len {len(r.content)}) for {t['key']}")
            continue
        im = Image.open(io.BytesIO(r.content))
        im = im.convert("RGB")
        w, h = im.size
        print(f"  Downloaded: {w}x{h}, {len(r.content)} bytes")

        # Resize sensibly if extremely huge (> 1600 on longest side)
        max_dim = 1400
        if max(w, h) > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
            print(f"  Resized to: {new_w}x{new_h}")

        for fname in t['filenames']:
            target_path = out_dir / fname
            if fname.endswith(".png"):
                im.save(target_path, "PNG", optimize=True)
            elif fname.endswith(".webp"):
                im.save(target_path, "WEBP", quality=88)
            else:
                im.save(target_path, "JPEG", quality=88)
            print(f"  Saved -> {target_path} ({target_path.stat().st_size} bytes)")
    except Exception as e:
        print(f"ERROR downloading {t['key']}: {e}")

print("\nFinished downloading targets.")

