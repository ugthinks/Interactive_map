import requests, re
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}

def check(url):
    print("Checking:", url)
    r = requests.get(url, headers=headers)
    print("Status:", r.status_code)
    og = re.search(r'<meta property="og:image" content="([^"]+)"', r.text)
    if og:
        og_url = og.group(1)
        print("  OG:", og_url)
        res = requests.get(og_url, headers=headers)
        if res.status_code == 200:
            im = Image.open(io.BytesIO(res.content))
            print("  Size:", im.size, im.format, "Bytes:", len(res.content))
            return og_url

check("https://www.pepperonpizza.com/mizo-bai-recipe-rice-vegetable-stew/")
check("https://www.archanaskitchen.com/mizo-bai-recipe")
check("https://www.archanaskitchen.com/sawhchiar-recipe-mizoram-meat-pulao")

