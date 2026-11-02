import requests
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}

def inspect(url, label):
    r = requests.get(url, headers=headers, timeout=15)
    im = Image.open(io.BytesIO(r.content))
    print(label, "Format:", im.format, "Size:", im.size, "Bytes:", len(r.content))

inspect("https://static1.squarespace.com/static/578753d7d482e9c3a909de40/t/66166b7e2f40cd644f4c1f84/1712745342168/_MG_0437.jpg?format=1500w", "Goya Galho")
inspect("https://www.pavaniskitchen.com/wp-content/uploads/2019/04/naga-galho.jpg", "Pavani Galho")

