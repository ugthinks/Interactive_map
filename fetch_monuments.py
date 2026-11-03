import re, json, time, pathlib, os, requests

HEADERS = {"User-Agent": "CulinaryAtlasProject/1.0 (personal project; contact: your-email@example.com)"}
MON_JS = pathlib.Path("src/data/monuments.js")
RAW = pathlib.Path("public/assets/monuments/raw")
RAW.mkdir(parents=True, exist_ok=True)
MANIFEST = RAW / "monuments_manifest.json"

# Read "state-id": { name: '...' } pairs straight from monuments.js
text = MON_JS.read_text(encoding="utf-8")
entries = re.findall(r"['\"]([a-z\-]+)['\"]:\s*\{\s*name:\s*['\"]([^'\"]+)['\"]", text)
print(f"Found {len(entries)} monuments in monuments.js")

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

STOP = {"the", "of", "and", "a", "in"}
def words(s):
    return {w for w in re.findall(r"[a-z]+", s.lower()) if w not in STOP}

def wiki_image(name):
    # 1) exact article title
    data = get_json("https://en.wikipedia.org/w/api.php", {
        "action": "query", "format": "json", "redirects": 1, "titles": name,
        "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 800})
    for p in data.get("query", {}).get("pages", {}).values():
        if "thumbnail" in p:
            return p["thumbnail"]["source"], p["title"]
    # 2) search, accepting only results whose title shares a word with the monument name
    data = get_json("https://en.wikipedia.org/w/api.php", {
        "action": "query", "format": "json", "generator": "search", "gsrsearch": name,
        "gsrlimit": 3, "prop": "pageimages", "piprop": "thumbnail", "pithumbsize": 800})
    pages = sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 99))
    for p in pages:
        if "thumbnail" in p and words(p["title"]) & words(name):
            return p["thumbnail"]["source"], p["title"]
    return None, None

manifest = json.load(open(MANIFEST, encoding="utf-8")) if MANIFEST.exists() else {}
for state_id, name in entries:
    existing = list(RAW.glob(state_id + ".*"))
    if existing:
        print("SKIP (already fetched):", state_id)
        continue
    try:
        url, source = wiki_image(name)
    except Exception as e:
        print("ERROR:", state_id, e)
        url = None
    if not url:
        manifest[state_id] = {"status": "NOT_FOUND", "name": name}
        print("NOT FOUND:", state_id, "-", name)
    else:
        try:
            ext = os.path.splitext(url.split("?")[0])[1].lower() or ".jpg"
            img = requests.get(url, headers=HEADERS, timeout=30)
            (RAW / f"{state_id}{ext}").write_bytes(img.content)
            manifest[state_id] = {"status": "FOUND", "name": name, "source": source, "from_url": url}
            print("OK:", state_id, "-", name, "->", source)
        except Exception as e:
            manifest[state_id] = {"status": "DOWNLOAD_FAILED", "name": name}
            print("DOWNLOAD FAILED:", state_id, e)
    json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    time.sleep(1.5)

found = sum(1 for m in manifest.values() if m.get("status") == "FOUND")
print(f"\nDone. {found} of {len(entries)} fetched. Originals are in public/assets/monuments/raw/")