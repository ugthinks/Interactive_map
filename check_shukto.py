import requests

headers = {'User-Agent': 'CulinaryAtlasIndia/2.0 (contact: project@culinaryatlas.org)'}

def get_meta(title):
    r = requests.get('https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=' + requests.utils.quote(title) + '&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1000', headers=headers).json()
    info = list(r['query']['pages'].values())[0]['imageinfo'][0]
    print('Title:', title)
    print('URL:', info.get('thumburl') or info.get('url'))
    print('Size:', info['width'], 'x', info['height'])
    meta = info.get('extmetadata', {})
    print('Artist:', meta.get('Artist', {}).get('value'))
    print('License:', meta.get('LicenseShortName', {}).get('value'))
    print('Description:', meta.get('ImageDescription', {}).get('value'))
    print('---')

get_meta('File:Shukto, a Bengali dish.jpg')
get_meta('File:Shukto-Ahare Bangla 2016 DSC 7615.jpg')

