import requests, json, time, pathlib
from PIL import Image
import io

HEADERS = {'User-Agent': 'CulinaryAtlasIndia/2.0 (contact: project@culinaryatlas.org)'}
OUT = pathlib.Path("public/assets/dishes")

CORRUPTED_LIST = [
    ("andhra-pradesh_1911_pesarattu.jpg", "Pesarattu"),
    ("bihar_1980_makhana-kheer.jpg", "Makhana kheer"),
    ("chandigarh_1980_tandoori-chicken.jpg", "Tandoori chicken"),
    ("gujarat_1857_khaman-dhokla.jpg", "Khaman dhokla"),
    ("haryana_1765_bajra-khichdi.jpg", "Bajra khichdi"),
    ("haryana_1857_churma.jpg", "Churma"),
    ("himachal-pradesh_1765_siddu.jpg", "Siddu (food)"),
    ("jammu-and-kashmir_1857_kahwa.jpg", "Kahwah"),
    ("jammu-and-kashmir_1980_tabak-maaz.jpg", "Tabak maaz"),
    ("lakshadweep_1980_coconut-halwa.jpg", "Halva coconut"),
    ("maharashtra_1765_puran-poli.jpg", "Puran poli"),
    ("mizoram_1765_bai.jpg", "Mizo Bai dish"),
    ("mizoram_1857_sawhchiar.jpg", "Sawhchiar"),
    ("nagaland_1911_naga-king-chilli-chutney.jpg", "Naga morich"),
    ("odisha_1765_dalma.jpg", "Dalma (curry)"),
    ("odisha_1947_macha-besara.jpg", "Macha besara"),
    ("rajasthan_1857_lehsun-ki-chutney.png", "Lahsun ki chutney"),
    ("sikkim_1857_kinema.jpg", "Kinema"),
    ("tamil-nadu_1947_idli-with-sambar.jpg", "Idli sambar"),
    ("telangana_1911_hyderabadi-haleem.jpg", "Hyderabadi haleem"),
    ("telangana_1947_osmania-biscuit.jpg", "Osmania biscuit"),
    ("uttar-pradesh_1911_mathura-ke-pede.jpg", "Peda"),
    ("west-bengal_1911_mishti-doi.jpg", "Mishti doi"),
    ("andaman-and-nicobar-islands_1857_jungle-fish-preserve.jpg", "Fish preserve curry"),
    ("andaman-and-nicobar-islands_1911_coconut-crab-curry.jpg", "Crab curry")
]

def search_wikimedia(query):
    # 1. Try exact Wikipedia page image
    r = requests.get("https://en.wikipedia.org/w/api.php", params={
        "action": "query", "format": "json", "redirects": 1, "titles": query,
        "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 1000
    }, headers=HEADERS, timeout=15).json()
    for p in r.get("query", {}).get("pages", {}).values():
        if "thumbnail" in p:
            return p["thumbnail"]["source"], p["title"]

    # 2. Try Wikipedia search
    r = requests.get("https://en.wikipedia.org/w/api.php", params={
        "action": "query", "format": "json", "generator": "search", "gsrsearch": query,
        "gsrlimit": 3, "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 1000
    }, headers=HEADERS, timeout=15).json()
    for p in sorted(r.get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 99)):
        if "thumbnail" in p:
            return p["thumbnail"]["source"], p["title"]

    # 3. Try Commons search
    r = requests.get("https://commons.wikimedia.org/w/api.php", params={
        "action": "query", "format": "json", "generator": "search", "gsrsearch": query,
        "gsrnamespace": 6, "gsrlimit": 3, "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 1000
    }, headers=HEADERS, timeout=15).json()
    for p in r.get("query", {}).get("pages", {}).values():
        info = (p.get("imageinfo") or [{}])[0]
        if "thumburl" in info:
            return info["thumburl"], p["title"]

    return None, None

results = []
for fname, query in CORRUPTED_LIST:
    print(f"Searching for {fname} ({query})...")
    url, title = search_wikimedia(query)
    if not url:
        # Fallback query variations
        short_query = query.split()[0]
        url, title = search_wikimedia(short_query)
    
    if url:
        print(f"  Found: {title} -> {url[:70]}...")
        try:
            res = requests.get(url, headers=HEADERS, timeout=25)
            if res.status_code == 200 and len(res.content) > 1000:
                im = Image.open(io.BytesIO(res.content)).convert("RGB")
                w, h = im.size
                if max(w, h) > 1400:
                    scale = 1400 / max(w, h)
                    im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
                
                target = OUT / fname
                if fname.endswith(".png"):
                    im.save(target, "PNG")
                elif fname.endswith(".webp"):
                    im.save(target, "WEBP", quality=88)
                else:
                    im.save(target, "JPEG", quality=88)
                print(f"  Saved {fname} ({target.stat().st_size} bytes)")
                results.append({"file": fname, "query": query, "title": title, "status": "FIXED"})
            else:
                print(f"  FAILED to download image bytes for {fname}")
                results.append({"file": fname, "query": query, "status": "FAILED_BYTES"})
        except Exception as e:
            print(f"  ERROR saving {fname}: {e}")
            results.append({"file": fname, "query": query, "status": "ERROR"})
    else:
        print(f"  NOT FOUND: {query}")
        results.append({"file": fname, "query": query, "status": "NOT_FOUND"})
    time.sleep(1)

with open("corrupted_fix_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
print("Done. Saved corrupted_fix_results.json")

