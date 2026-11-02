import requests, json, time, pathlib, os, re

HEADERS = {"User-Agent": "CulinaryAtlasProject/1.0 (personal project; contact: your-email@example.com)"}
OUT = pathlib.Path("public/assets/dishes")
OUT.mkdir(parents=True, exist_ok=True)
dishes = json.load(open("dish_list.json", encoding="utf-8"))

def get_json(url, params):
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, params=params, timeout=20)
            if r.status_code == 200 and r.text.lstrip().startswith("{"):
                return r.json()
        except requests.RequestException:
            pass
        time.sleep(3 * (attempt + 1))
    return {}

STOP = {"food", "india", "the", "of", "and", "with", "on", "a", "in"}
def words(s):
    return set(re.findall(r"[a-z]+", s.lower())) - STOP

def relevant(title, dish):
    return len(words(title) & words(dish)) > 0

def wikipedia_image(dish):
    # 1) exact article title
    data = get_json("https://en.wikipedia.org/w/api.php", {
        "action": "query", "format": "json", "redirects": 1, "titles": dish,
        "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 800})
    for p in data.get("query", {}).get("pages", {}).values():
        if "thumbnail" in p:
            return p["thumbnail"]["source"], p["title"]
    # 2) search, accepting only results whose title shares a word with the dish
    data = get_json("https://en.wikipedia.org/w/api.php", {
        "action": "query", "format": "json", "generator": "search", "gsrsearch": dish,
        "gsrlimit": 3, "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 800})
    for p in sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 99)):
        if "thumbnail" in p and relevant(p["title"], dish):
            return p["thumbnail"]["source"], p["title"]
    return None, None

def commons_image(dish):
    data = get_json("https://commons.wikimedia.org/w/api.php", {
        "action": "query", "format": "json", "generator": "search", "gsrsearch": dish,
        "gsrnamespace": 6, "gsrlimit": 5, "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 800})
    for p in sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 99)):
        info = (p.get("imageinfo") or [{}])[0]
        if "thumburl" in info and relevant(p["title"], dish):
            return info["thumburl"], p["title"]
    return None, None

manifest, used = {}, set()
for d in dishes:
    clean = re.sub(r"\s*\(.*?\)", "", d["dish"]).strip()
    url = source = None
    try:
        url, source = wikipedia_image(clean)
        if not url:
            url, source = commons_image(clean)
    except Exception as e:
        print("ERROR:", d["dish"], e)

    if url and url not in used:
        used.add(url)
        ext = os.path.splitext(url.split("?")[0])[1].lower() or ".jpg"
        fname = d["key"] + ext
        try:
            img = requests.get(url, headers=HEADERS, timeout=30)
            (OUT / fname).write_bytes(img.content)
            manifest[d["key"]] = {"status": "FOUND", "image": f"/assets/dishes/{fname}",
                                  "source": source, "from_url": url,
                                  "dish": d["dish"], "state": d["state"], "era": d["era"]}
            print("OK:", d["state"], d["era"], d["dish"], "->", source)
        except Exception as e:
            url = None
            print("DOWNLOAD FAILED:", d["dish"], e)

    if not url or url in used and manifest.get(d["key"], {}).get("status") != "FOUND":
        manifest[d["key"]] = {"status": "NOT_FOUND", "dish": d["dish"], "state": d["state"], "era": d["era"]}
        print("NOT FOUND:", d["state"], d["era"], d["dish"])

    json.dump(manifest, open("image_manifest.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    time.sleep(1.5)

found = sum(1 for m in manifest.values() if m["status"] == "FOUND")
print(f"\nDone. Found {found} of {len(dishes)}. See image_manifest.json")