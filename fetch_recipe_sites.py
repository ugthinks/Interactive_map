# import requests, json, time, pathlib, os, re

# HEADERS = {"User-Agent": "Mozilla/5.0 (CulinaryAtlasProject; personal project; contact: your-email@example.com)"}
# OUT = pathlib.Path("public/assets/dishes")
# OUT.mkdir(parents=True, exist_ok=True)

# SITES = [
#     "https://hebbarskitchen.com",
#     "https://vegrecipesofindia.com",
#     "https://swasthi.com",
#     "https://sharmispassions.com",
#     "https://cookwithmanali.com",
# ]

# dishes = {d["key"]: d for d in json.load(open("dish_list.json", encoding="utf-8"))}
# manifest = json.load(open("image_manifest.json", encoding="utf-8"))
# used = {m["from_url"] for m in manifest.values() if m.get("status") == "FOUND" and "from_url" in m}
# STOP = {"food", "india", "the", "of", "and", "with", "on", "a", "in", "royal", "heritage", "revival"}

# def words(s):
#     return set(re.findall(r"[a-z]+", s.lower())) - STOP

# def fetch(url):
#     try:
#         r = requests.get(url, headers=HEADERS, timeout=20)
#         return r.text if r.status_code == 200 else ""
#     except requests.RequestException:
#         return ""

# def first_post(site, term):
#     html = fetch(f"{site}/?s={requests.utils.quote(term)}")
#     links = re.findall(r'href="(https?://[^"]+)"', html)
#     for link in links:
#         if link.startswith(site) and "?" not in link and "/category/" not in link and "/tag/" not in link and link.count("/") >= 4:
#             return link
#     return None

# def og_image_and_title(page):
#     html = fetch(page)
#     img = re.search(r'<meta property="og:image" content="([^"]+)"', html)
#     title = re.search(r'<meta property="og:title" content="([^"]+)"', html) or re.search(r"<title>([^<]+)</title>", html)
#     return (img.group(1) if img else None), (title.group(1) if title else "")

# def simplify(dish):
#     s = re.sub(r"\(.*?\)", "", dish)
#     s = re.split(r"\bwith\b|&|\bon\b", s)[0]
#     return re.sub(r"\s+", " ", s).strip()

# for key, m in list(manifest.items()):
#     if m.get("status") != "NOT_FOUND":
#         continue  # already fetched in an earlier pass
#     if list(OUT.glob(key + ".*")):
#         print("SKIP (file already on disk):", key)
#         continue  # image file exists, so never download it again

#     d = dishes[key]
#     term = simplify(d["dish"])
#     if len(words(term)) == 0 or len(term) < 4:
#         print("SKIP (placeholder):", d["state"], d["era"], d["dish"])
#         continue
#     found = False
#     for site in SITES:
#         post = first_post(site, term)
#         if not post:
#             continue
#         img_url, title = og_image_and_title(post)
#         if not img_url or img_url in used:
#             continue
#         # the recipe title must share a real word with the dish name
#         if not (words(title) & words(term)):
#             continue
#         try:
#             ext = os.path.splitext(img_url.split("?")[0])[1].lower() or ".jpg"
#             fname = key + ext
#             img = requests.get(img_url, headers=HEADERS, timeout=30)
#             (OUT / fname).write_bytes(img.content)
#             used.add(img_url)
#             manifest[key] = {"status": "FOUND", "image": f"/assets/dishes/{fname}",
#                              "source": title, "from_url": img_url, "page": post,
#                              "dish": d["dish"], "state": d["state"], "era": d["era"]}
#             print("OK:", d["state"], d["era"], d["dish"], "->", site)
#             found = True
#             break
#         except Exception as e:
#             print("DOWNLOAD FAILED:", d["dish"], e)
#     if not found:
#         print("NOT FOUND:", d["state"], d["era"], d["dish"], f"[searched: {term}]")
#     json.dump(manifest, open("image_manifest.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
#     time.sleep(1.5)

# found_total = sum(1 for m in manifest.values() if m["status"] == "FOUND")
# print(f"\nDone. Total found now: {found_total} of {len(manifest)}")

import requests, re
url = "https://hebbarskitchen.com/search/Kosha+Mangsho/feed/rss2/"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=20)
items = re.findall(r"<item>.*?<title>(.*?)</title>.*?<link>(.*?)</link>", r.text, re.S)
print("status:", r.status_code, "posts found:", len(items))
for title, link in items[:5]:
    print(title, "|", link)