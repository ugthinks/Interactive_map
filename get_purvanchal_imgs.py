import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
html = requests.get('https://purvanchaltadka.com/2022/05/05/vegetarian-skyu/', headers=headers).text
imgs = re.findall(r'<img[^>]+src="([^">]+\.(?:jpg|jpeg|png))"', html)
for img in imgs:
    if 'uploads' in img:
        print(img)

