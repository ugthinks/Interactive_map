import requests, re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def check(url):
    print("Checking:", url)
    try:
        r = requests.get(url, headers=headers, timeout=15)
        print("Status:", r.status_code)
        og = re.search(r'<meta property="og:image" content="([^"]+)"', r.text)
        if og:
            print("OG Image:", og.group(1))
        imgs = re.findall(r'<img[^>]+src="([^">]+\.(?:jpg|jpeg|png|webp))"', r.text, re.I)
        for img in imgs[:5]:
            print("IMG:", img)
    except Exception as e:
        print("ERR:", e)

check("https://blissofcooking.com/2021/08/chawal-ka-cheela-rice-flour-chilla/")
check("https://www.spicingyourlife.com/chhattisgarh-chawal-ke-fare/")
check("https://themadscientistskitchen.com/phara-a-traditional-recipe-from-chhattisgarh/")

