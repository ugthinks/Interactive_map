import fs from 'fs';
import { ERAS } from './eraConfig.js';
import { buildDatabase as getCustomStates } from './buildCulinaryData.js';

const allStates = JSON.parse(fs.readFileSync('scripts/all_states.json', 'utf-8'));
const customStates = getCustomStates();

// Merge custom states into allStates
for (const [id, customData] of Object.entries(customStates)) {
  allStates[id] = customData;
}

// Add specialized custom research for West Bengal, Punjab, Maharashtra, Gujarat, Tamil Nadu, Telangana, Jammu & Kashmir
allStates['west-bengal'].culinaryTitle = 'The Ganga Delta, Mustard Hilsa & Confectionery Art';
allStates['west-bengal'].historicalIntro = 'From royal Nawabi kitchens of Murshidabad to the addas of 19th-century Calcutta, Bengal refined a multi-course dining philosophy balancing bitter starters, pungent mustard gravies, and exquisite chhena sweets.';
allStates['west-bengal'].indigenousIngredients = ['Shorshe (Yellow & Black Mustard Paste)', 'Gobindobhog Rice', 'Panch Phoron', 'Nolen Gur (Date Palm Jaggery)', 'Radhuni', 'Gondhoraj Lebu'];
allStates['west-bengal'].eras[1765].signatureDish = 'Zamindari Shorshe Ilish with Steamed Rice';
allStates['west-bengal'].eras[1765].signatureFlavor = 'Pungent freshly ground mustard seed, raw green chili slit, cold-pressed mustard oil, sweet hilsa fat';
allStates['west-bengal'].eras[1857].signatureDish = 'Kolkata Awadhi Dum Biryani with Golden Potato';
allStates['west-bengal'].eras[1857].signatureStory = 'Exiled from Lucknow in 1856, Nawab Wajid Ali Shah settled in Metiabruz, Kolkata. His royal bawarchis introduced large, tender spiced potatoes into the biryani—which absorbed the rich mutton fat so gloriously that the potato became Kolkata biryani\'s sacred hallmark.';
allStates['west-bengal'].eras[1911].signatureDish = 'Nobin Chandra Das Sponge Rosogolla & Sandesh';
allStates['west-bengal'].eras[1980].signatureDish = 'Tangra Chinatown Hakka Chilli Chicken';
allStates['west-bengal'].eras[1980].eraStory = 'In Kolkata\'s historic Tangra neighborhood, Chinese Hakka tanners and restaurateurs invented Indo-Chinese cuisine, tossing dark soy sauce and green chilies in smoking woks to create Chilli Chicken and Hakka Chowmein.';

allStates['punjab'].culinaryTitle = 'The Five Rivers, Sanjha Chulha & Tandoori Revolution';
allStates['punjab'].historicalIntro = 'A land of bountiful agricultural harvests, slow-churned white butter (makhan), golden mustard greens, and the iconic clay tandoor that revolutionized Indian dining worldwide.';
allStates['punjab'].indigenousIngredients = ['Sarson (Mustard Greens)', 'Makki (Stoneground Cornmeal)', 'White Desi Butter (Makhan)', 'Black Urad Dal', 'Kasuri Methi', 'Buffalo Milk Curd'];
allStates['punjab'].eras[1700].signatureDish = 'Slow-Simmered Sarson ka Saag & Makki di Roti';
allStates['punjab'].eras[1700].signatureFlavor = 'Earthy bitter-sweet mustard greens, rich churned white butter, nutty sweet roasted cornmeal';
allStates['punjab'].eras[1947].signatureDish = 'Daryaganj Tandoori Murgh & Dal Makhani';
allStates['punjab'].eras[1947].eraStory = 'Following the partition of Punjab, refugee chef Kundan Lal Gujral brought the clay tandoor from Peshawar to Delhi, creating Butter Chicken and Dal Makhani by simmering tandoori chicken and black lentils in tomato puree, fresh cream, and butter.';

allStates['maharashtra'].culinaryTitle = 'Sahyadri Hill Forts, Konkan Coast & Peasant Chulha';
allStates['maharashtra'].historicalIntro = 'A diverse gastronomic canvas spanning coastal Malvani seafood seasoned with tirphal, fiery Maratha mutton broths (Tambda-Pandhra Rassa), festive Puran Poli, and the street energy of Mumbai.';
allStates['maharashtra'].indigenousIngredients = ['Godha Masala (32-spice blend)', 'Kokum (Amsul)', 'Stone Flower (Dagad Phool)', 'Tirphal / Teppal', 'Jowar Flour', 'Byadgi Chilies'];
allStates['maharashtra'].eras[1700].signatureDish = 'Maratha Warrior Puran Poli with Katachi Amti';
allStates['maharashtra'].eras[1765].signatureDish = 'Kolhapuri Tambda-Pandhra Rassa';
allStates['maharashtra'].eras[1857].signatureDish = 'Bombay Parsi Bun Maska & Irani Chai';
allStates['maharashtra'].eras[1980].signatureDish = 'Girangaon Mill Workers\' Mumbai Pav Bhaji';
allStates['maharashtra'].eras[1980].eraStory = 'In the 1960s and 1980s, Bombay\'s textile mill workers required a quick, nutritious, hot lunch between grinding shifts. Street vendors mashed leftover vegetables on huge sizzling tawas with tomatoes, butter, and pav bhaji masala, serving it with toasted ladi pav—birthing an international street food icon.';

allStates['gujarat'].culinaryTitle = 'Kathiawar Plains, Earthen Undhiyu & Farsan Mastery';
allStates['gujarat'].historicalIntro = 'Famed for its exquisite balance of sweet, salty, sour, and spicy notes (khatta-meetha), Gujarat turned seasonal winter vegetables into earthenware feasts (Undhiyu) and steam-cooked farsan into an art.';
allStates['gujarat'].indigenousIngredients = ['Tuver Lilva (Green Pigeon Peas)', 'White Sesame Seeds', 'Kokum', 'Jaggery (Gor)', 'Asafoetida (Hing)', 'Khandvi Flour'];
allStates['gujarat'].eras[1700].signatureDish = 'Surti Matla Undhiyu (Inverted Earthen Pot Bake)';
allStates['gujarat'].eras[1700].eraStory = 'Farmers in the Surat countryside layered winter vegetables—surti papdi, purple yam (kand), sweet potatoes, and methi muthia—inside unglazed clay pots (matkas), sealed them with leaves, and buried them upside-down under burning piles of hay and dry cow dung in the fields.';

allStates['tamil-nadu'].culinaryTitle = 'Chola Dynasties, Chettinad Mansions & Filter Kaapi';
allStates['tamil-nadu'].historicalIntro = 'From the ancient vegetarian temple kitchens of Thanjavur and Madurai to the fiery black-pepper feasts of Chettiar seafaring merchants, Tamil Nadu is an ancient celebration of culinary precision.';
allStates['tamil-nadu'].indigenousIngredients = ['Kalpasi (Black Stone Flower)', 'Maratti Mokku (Star Spices)', 'Small Shallots (Sambar Vengayam)', 'Curry Leaves', 'Cold-Pressed Sesame (Gingelly) Oil', 'Guntur Chilies'];
allStates['tamil-nadu'].eras[1765].signatureDish = 'Chettinad Kozhi Pepper Roast';
allStates['tamil-nadu'].eras[1765].eraStory = 'The Nattukottai Chettiars, wealthy maritime traders across Burma, Ceylon, and Southeast Asia, brought back star anise, black stone flower, and exotic spices to their grand Karaikudi mansions, creating the fiery, highly aromatic Chettinad cuisine.';

allStates['telangana'].culinaryTitle = 'The Nizami Dastarkhwan & Deccan Millet Hearth';
allStates['telangana'].historicalIntro = 'Where opulent royal Persian-Mughal court traditions—such as slow-cooked Haleem and Hyderabadi Dum Biryani—converge with the rustic, chili-fired millets and gongura of the Deccan plateau.';
allStates['telangana'].indigenousIngredients = ['Potli Masala of Hyderabad', 'Wild Stone Wheat', 'Guntur Red Chilies', 'Jowar (Sorghum)', 'Dry Coconut (Kopra)', 'Chironji Nuts'];
allStates['telangana'].eras[1765].signatureDish = 'Royal Hyderabadi Kacchi Dum Biryani';
allStates['telangana'].eras[1857].signatureDish = 'Barki Haleem Slow-Cooked with Stone Wheat';
allStates['telangana'].eras[1857].eraStory = 'Brought to Hyderabad by Arab Chaush soldiers serving in the Nizam\'s army, Barki Haleem was slow-cooked for 12 hours in large copper cauldrons (bhattis), pounded with heavy wooden oars until meat, wheat, and spices liquefied into a velvety porridge.';

allStates['delhi'].culinaryTitle = 'Imperial Crossroads, Shahjahanabad & The Tandoor Revolution';
allStates['delhi'].historicalIntro = 'The imperial crossroads of India—from the slow-simmered winter Nihari of Old Delhi to the post-1947 refugee kitchens of Daryaganj that made Butter Chicken an international emblem of Indian food.';
allStates['delhi'].indigenousIngredients = ['Tandoori Spices', 'Khameeri Roti Dough', 'White Butter (Makhan)', 'Pomegranate Seeds', 'Nihari Spice Potli', 'Kewra Water'];
allStates['delhi'].eras[1700].signatureDish = 'Shahjahanabad Gosht Nihari with Khameeri Roti';
allStates['delhi'].eras[1947].signatureDish = 'Original Daryaganj Moti Mahal Butter Chicken';
allStates['delhi'].eras[1980].signatureDish = 'Chandni Chowk Paranthe & Natraj Dahi Bhalla';

// Build the complete JS file
const fileContent = `// =========================================================================
// INDIA, SERVED THROUGH TIME - MASTER CULINARY ARCHIVE (1700 - 2020)
// Complete Historical Gastronomy Database for All 36 States & UTs
// =========================================================================

export const ERAS = ${JSON.stringify(ERAS, null, 2)};

export const CULINARY_DATABASE = ${JSON.stringify(allStates, null, 2)};

export function getStateData(stateId) {
  if (!stateId) return null;
  const normalized = stateId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return CULINARY_DATABASE[normalized] || null;
}

export function getStateEraContent(stateId, eraId) {
  const state = getStateData(stateId);
  if (!state) return null;
  const eraKey = String(eraId || 1700);
  return state.eras[eraKey] || state.eras['1700'] || null;
}

export function getAllStates() {
  return Object.values(CULINARY_DATABASE);
}

export function getEra(eraId) {
  const numeric = Number(eraId);
  return ERAS.find(e => e.id === numeric) || ERAS[0];
}
`;

fs.writeFileSync('src/data/culinaryData.js', fileContent);
console.log('Successfully wrote src/data/culinaryData.js! Total states:', Object.keys(allStates).length);
console.log('File size:', (fs.statSync('src/data/culinaryData.js').size / 1024).toFixed(1), 'KB');
