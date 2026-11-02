import requests, re

headers = {'User-Agent': 'Mozilla/5.0'}

r = requests.get('https://vinayasculinarydelights.com/?s=skyu', headers=headers)
print("Vinaya search:", r.status_code)
links = re.findall(r'href="(https://vinayasculinarydelights\.com/[^"]+)"', r.text)
for l in set(links):
    if 'skyu' in l.lower():
        print("  Found link:", l)

r2 = requests.get('https://purvanchaltadka.com/?s=skyu', headers=headers)
print("Purvanchal search:", r2.status_code)
links2 = re.findall(r'href="(https://purvanchaltadka\.com/[^"]+)"', r2.text)
for l in set(links2):
    if 'skyu' in l.lower():
        print("  Found link 2:", l)

