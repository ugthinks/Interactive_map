import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
html = requests.get('https://www.goya.in/blog/galho-the-original-comfort-food-of-nagaland', headers=headers).text
imgs = re.findall(r'<img[^>]+(?:src|data-src)="([^">]+)"', html)
for img in imgs:
    if 'squarespace' in img:
        print(img)

