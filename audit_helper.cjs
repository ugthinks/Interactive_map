const fs = require('fs');

async function main() {
  const mod = await import('./src/data/culinaryData.js');
  const allStates = mod.getAllStates ? mod.getAllStates() : [];
  console.log(`Found ${allStates.length} states in culinaryData.`);

  const dishEntries = [];
  const signatureEntries = [];

  for (const state of allStates) {
    const stateId = state.id;
    const stateName = state.name;
    const eras = state.eras || {};

    for (const [year, eraData] of Object.entries(eras)) {
      if (eraData.signatureDish) {
        signatureEntries.push({
          stateId,
          stateName,
          year,
          type: 'signature',
          dishName: eraData.signatureDish,
          image: eraData.signatureImage,
          flavor: eraData.signatureFlavor
        });
      }

      if (eraData.dishes && Array.isArray(eraData.dishes)) {
        eraData.dishes.forEach((d, idx) => {
          dishEntries.push({
            stateId,
            stateName,
            year,
            type: `dish[${idx}]`,
            dishName: d.name,
            image: d.image,
            description: d.description
          });
        });
      }
    }
  }

  console.log(`Total signature dish entries: ${signatureEntries.length}`);
  console.log(`Total card dish entries: ${dishEntries.length}`);

  const allEntries = [...signatureEntries, ...dishEntries];

  // 1. Group by image
  const imgMap = {};
  for (const e of allEntries) {
    if (!e.image) {
      console.log(`ENTRY WITHOUT IMAGE: ${e.stateName} ${e.year} ${e.dishName} (${e.type})`);
      continue;
    }
    if (!imgMap[e.image]) imgMap[e.image] = [];
    imgMap[e.image].push(e);
  }

  console.log(`Total unique image paths referenced: ${Object.keys(imgMap).length}`);

  // 2. Duplicates
  const duplicates = Object.entries(imgMap).filter(([img, list]) => list.length > 1);
  console.log(`\n=== DUPLICATE IMAGE ASSIGNMENTS (${duplicates.length}) ===`);
  for (const [img, list] of duplicates) {
    console.log(`\n[${list.length}x] ${img}`);
    list.forEach(item => {
      console.log(`    - ${item.stateName} (${item.year}) [${item.type}]: "${item.dishName}"`);
    });
  }

  // 3. Check file existence
  let missing = 0;
  for (const img of Object.keys(imgMap)) {
    let p = img;
    if (p.startsWith('/')) p = './public' + p;
    else if (!p.startsWith('http')) p = './public/' + p;
    
    if (!p.startsWith('http') && !fs.existsSync(p)) {
      missing++;
      console.log(`MISSING LOCAL FILE: ${img} (${p})`);
    }
  }
  console.log(`\nTotal missing image files on disk: ${missing}`);

  // 4. Specifically inspect the 12 items reported by user
  console.log(`\n=== INSPECTION OF THE 12 USER-REPORTED ITEMS ===`);
  const targets = [
    { stateId: 'sikkim', year: '2020', cardDish: 'Buckwheat Heritage Revival' },
    { stateId: 'manipur', year: '1980', cardDish: 'Manipuri Fish Curry' },
    { stateId: 'manipur', year: '1947', cardDish: 'Ngari' },
    { stateId: 'manipur', year: '2020', cardDish: 'Black Rice Heritage Revival' },
    { stateId: 'nagaland', year: '1947', cardDish: 'Galho' },
    { stateId: 'chhattisgarh', year: '1765', cardDish: 'Chila' },
    { stateId: 'chhattisgarh', year: '1857', cardDish: 'Faraa' },
    { stateId: 'west-bengal', year: '1700', cardDish: 'Royal West Bengal Simmered Pot' },
    { stateId: 'gujarat', year: '1980', cardDish: 'Khandvi' },
    { stateId: 'himachal-pradesh', year: '1911', cardDish: 'Madra' },
    { stateId: 'himachal-pradesh', year: '1857', cardDish: 'Chha Gosht' },
    { stateId: 'ladakh', year: '1765', cardDish: 'Skyu' },
    { stateId: 'rajasthan', year: '1700', cardDish: 'Traditional Royal Ker Sangri' }
  ];

  for (const t of targets) {
    const s = mod.getStateData(t.stateId);
    if (!s) {
      console.log(`State NOT FOUND: ${t.stateId}`);
      continue;
    }
    const era = (s.eras || {})[t.year];
    if (!era) {
      console.log(`Era ${t.year} NOT FOUND for ${t.stateId}`);
      continue;
    }
    console.log(`\nTARGET: ${s.name} (${t.year}) - expecting "${t.cardDish}"`);
    console.log(`  SignatureDish: "${era.signatureDish}"`);
    console.log(`  SignatureImage: "${era.signatureImage}"`);
    if (era.dishes) {
      era.dishes.forEach((d, i) => {
        console.log(`  Dish[${i}]: "${d.name}" -> Image: "${d.image}"`);
      });
    }
  }
}

main().catch(console.error);
