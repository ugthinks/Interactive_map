import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
html = requests.get('https://themadscientistskitchen.com/phara-a-traditional-recipe-from-chhattisgarh/', headers=headers).text
imgs = re.findall(r'<img[^>]+(?:src|data-lazy-src)="([^">]+)"', html)
for img in imgs:
    if 'uploads' in img and not 'logo' in img:
        print(img)

