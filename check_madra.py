import requests

headers = {'User-Agent': 'CulinaryAtlasIndia/2.0 (contact: project@culinaryatlas.org)'}
r = requests.get('https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=File:White_Chana_Madra.jpg&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1000', headers=headers).json()
info = list(r['query']['pages'].values())[0]['imageinfo'][0]
print('Thumb URL:', info['thumburl'])
print('Size:', info['width'], 'x', info['height'])
meta = info.get('extmetadata', {})
print('Artist:', meta.get('Artist', {}).get('value'))
print('License:', meta.get('LicenseShortName', {}).get('value'))
print('Description:', meta.get('ImageDescription', {}).get('value'))

