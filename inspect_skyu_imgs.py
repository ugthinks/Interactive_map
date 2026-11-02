import requests, re
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}

def inspect_page(url):
    print("Inspecting:", url)
    r = requests.get(url, headers=headers)
    og = re.search(r'<meta property="og:image" content="([^"]+)"', r.text)
    if og:
        og_url = og.group(1)
        print("OG:", og_url)
        res = requests.get(og_url, headers=headers)
        if res.status_code == 200:
            im = Image.open(io.BytesIO(res.content))
            print("  Size:", im.size, "Format:", im.format, "Bytes:", len(res.content))

inspect_page('https://vinayasculinarydelights.com/skyu/')
inspect_page('https://purvanchaltadka.com/2022/05/05/vegetarian-skyu/')

