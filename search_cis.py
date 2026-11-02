import requests, re
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}
r = requests.get('https://www.cuisineindiasociety.in/?s=Mizoram', headers=headers)
print("status:", r.status_code)
links = re.findall(r'href="([^"]+)"', r.text)
for l in set(links):
    if 'bai' in l.lower() or 'mizo' in l.lower():
        print("Link:", l)

