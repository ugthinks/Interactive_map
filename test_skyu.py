import requests
from PIL import Image
import io

headers = {'User-Agent': 'Mozilla/5.0'}
u = 'https://i0.wp.com/purvanchaltadka.com/wp-content/uploads/2022/05/20220203_174038-01-1.jpeg'
r = requests.get(u, headers=headers)
im = Image.open(io.BytesIO(r.content))
print("Size:", im.size, "Format:", im.format, "Bytes:", len(r.content))
# Save local inspect
im.save("public/assets/dishes/test_skyu.jpg")
print("Saved test_skyu.jpg successfully")

