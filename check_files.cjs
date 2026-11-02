const fs = require('fs');

const files = [
  './public/assets/dishes/sikkim_2020_buckwheat-heritage-revival.png',
  './public/assets/dishes/manipur_1980_manipuri-fish-curry.png',
  './public/assets/dishes/manipur_1947_ngari.jpg',
  './public/assets/dishes/manipur_2020_black-rice-heritage-revival.jpg',
  './public/assets/dishes/nagaland_1947_galho.jpg',
  './public/assets/dishes/chhattisgarh_1765_chila.jpg',
  './public/assets/dishes/chhattisgarh_1857_faraa.jpg',
  './public/assets/dishes/west-bengal_1700_royal-west-bengal-simmered-pot.jpg',
  './public/assets/dishes/gujarat_1980_khandvi.jpg',
  './public/assets/dishes/himachal-pradesh_1911_madra.png',
  './public/assets/dishes/himachal-pradesh_1857_chha-gosht.jpg',
  './public/assets/dishes/ladakh_1765_skyu.jpg',
  './public/assets/dishes/rajasthan_1700_traditional-royal-ker-sangri.webp',
  './public/assets/dishes/rajasthan_1700_bajra-raab-khichdi.jpg'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const stat = fs.statSync(f);
    console.log(`${f} exists, size: ${stat.size} bytes`);
  } else {
    console.log(`${f} DOES NOT EXIST`);
  }
}

