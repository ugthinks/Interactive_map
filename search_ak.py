import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
r = requests.get('https://www.archanaskitchen.com/search?searchword=Mizoram', headers=headers)
print('status:', r.status_code)
links = re.findall(r'href="(/[^"#]+)"', r.text)
for l in set(links):
    if any(k in l.lower() for k in ['bai', 'sawhchiar', 'mizo', 'mizoram']):
        print(l)

