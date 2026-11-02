import requests, re
headers = {'User-Agent': 'Mozilla/5.0'}
r = requests.get('https://firsttimercook.com/?s=bai', headers=headers)
print("status:", r.status_code)
links = re.findall(r'href="([^"]+)"', r.text)
for l in set(links):
    if 'bai' in l.lower():
        print("Link:", l)

