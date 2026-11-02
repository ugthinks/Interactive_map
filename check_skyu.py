import requests, re
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}

def check_site(url):
    print("Checking:", url)
    try:
        r = requests.get(url, headers=headers, timeout=15)
        print("Status:", r.status_code)
        og = re.search(r'<meta property="og:image" content="([^"]+)"', r.text)
        if og:
            print("OG:", og.group(1))
            res = requests.get(og.group(1), headers=headers)
            im = Image.open(io.BytesIO(res.content))
            print("  Size:", im.size, im.format, "Bytes:", len(res.content))
        imgs = re.findall(r'<img[^>]+src="([^">]+\.(?:jpg|jpeg|png|webp))"', r.text, re.I)
        for img in imgs[:5]:
            print("  IMG:", img)
    except Exception as e:
        print("ERR:", e)

check_site("https://vinayasculinarydelights.com/oma-skyu-ladakhi-delicacy/")
check_site("https://purvanchaltadka.com/skyu-traditional-ladakhi-pasta-stew/")

