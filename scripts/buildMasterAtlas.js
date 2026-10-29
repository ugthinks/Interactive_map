import fs from 'fs';
import { ERAS } from './eraConfig.js';

// Load map data to verify all state IDs
const mapData = JSON.parse(fs.readFileSync('india_states_official.geojson')).features.map(f => {
  const name = f.properties.st_nm;
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { id, name };
});

console.log('Generating complete culinary data for', mapData.length, 'states and UTs...');

// We construct the master records
const script = `// =========================================================================
// INDIA, SERVED THROUGH TIME - MASTER CULINARY ARCHIVE (1700 - 2020)
// Complete Historical Gastronomy Database for All 36 States & UTs
// =========================================================================

export const ERAS = ${JSON.stringify(ERAS, null, 2)};

export const CULINARY_DATABASE = {
`;

fs.writeFileSync('src/data/culinaryData.js', script);
console.log('Started writing src/data/culinaryData.js');
