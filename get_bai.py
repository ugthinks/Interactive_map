import requests, re
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}

r = requests.get('https://www.firsttimercook.com/2018/04/bai-mizoram-vegetable-stew.html', headers=headers)
print("status:", r.status_code)
og = re.search(r'<meta property="og:image" content="([^"]+)"', r.text)
if og:
    print("OG:", og.group(1))
    res = requests.get(og.group(1), headers=headers)
    if res.status_code == 200:
        im = Image.open(io.BytesIO(res.content))
        print("Size:", im.size, im.format, "Bytes:", len(res.content))
        im.save("public/assets/dishes/mizoram_1765_bai.jpg", "JPEG")
        print("Saved mizoram_1765_bai.jpg successfully!")

