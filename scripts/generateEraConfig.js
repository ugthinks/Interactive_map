import fs from 'fs';

// We write a robust generator script that populates the complete culinary atlas
const script = `import fs from 'fs';

export const ERAS = [
  {
    id: 1700,
    year: 1700,
    label: "1700",
    roman: "MDCC",
    title: "The Imperial Feasts & Spice Zenith",
    subtitle: "Mughal Dastarkhwan, Maratha Fort Rations & Malabar Trade",
    angle: 0,
    theme: {
      id: "parchment",
      bgClass: "theme-1700",
      accent: "#d4af37",
      mapFill: "#2a221b",
      mapStroke: "#8c6f48",
      glow: "rgba(212, 175, 55, 0.35)",
      fontEra: "'Cinzel', serif",
      chronicle: "An era of imperial splendor and spice dominance. In royal courts from Agra to Thanjavur, bawarchis master the wood-fired deg and clay tandoor. European merchants arrive at coastal ports, but ancient black pepper, saffron, and indigenous millets still rule the royal palate."
    }
  },
  {
    id: 1765,
    year: 1765,
    label: "1765",
    roman: "MDCCLXV",
    title: "Nawab Splendour & Company Raj",
    subtitle: "Awadhi Dum Pukht, Bengal Nizamat & New World Botanicals",
    angle: 51.4,
    theme: {
      id: "copperplate",
      bgClass: "theme-1765",
      accent: "#c88a4b",
      mapFill: "#241d1a",
      mapStroke: "#a26e43",
      glow: "rgba(200, 138, 75, 0.35)",
      fontEra: "'Playfair Display', serif",
      chronicle: "Asaf-ud-Daula builds the monuments of Lucknow and royal bawarchis seal copper handis with dough to invent Dum Pukht. Simultaneously, New World chili peppers, potatoes, and tomatoes begin their quiet conquest of Indian regional gravies."
    }
  },
  {
    id: 1857,
    year: 1857,
    label: "1857",
    roman: "MDCCCLVII",
    title: "Victorian Raj & Iron Railways",
    subtitle: "Dak Bungalow Roasts, Railway Canteens & Parsi Bakeries",
    angle: 102.8,
    theme: {
      id: "victorian",
      bgClass: "theme-1857",
      accent: "#7ea3b5",
      mapFill: "#1b2328",
      mapStroke: "#527588",
      glow: "rgba(126, 163, 181, 0.35)",
      fontEra: "'Cormorant Garamond', serif",
      chronicle: "The iron horse transforms the subcontinent. Dak bungalows invent rustic roast chicken with country mustard, railway dining cars serve fiery Railway Mutton Curry, and Irani-Parsi bakeries bring Bun Maska and chai to Bombay's bustling docks."
    }
  },
  {
    id: 1911,
    year: 1911,
    label: "1911",
    roman: "MCMXI",
    title: "Imperial Capital & Swadeshi Fire",
    subtitle: "Royal Rampuri Feasts, Bengal Sweet Addas & Khadi Ethos",
    angle: 154.2,
    theme: {
      id: "lithograph",
      bgClass: "theme-1911",
      accent: "#c47a53",
      mapFill: "#221915",
      mapStroke: "#8f5739",
      glow: "rgba(196, 122, 83, 0.35)",
      fontEra: "'Playfair Display', serif",
      chronicle: "As the capital shifts to New Delhi, royal kingdoms like Patiala and Rampur host legendary 50-course banquets. Meanwhile, the Swadeshi movement sparks a passionate rediscovery of indigenous regional grains, temple sweets, and intellectual coffee house culture."
    }
  },
  {
    id: 1947,
    year: 1947,
    label: "1947",
    roman: "MCMXLVII",
    title: "Partition Hearth & Tandoor Revolution",
    subtitle: "Daryaganj Butter Chicken, Refugee Kitchens & Udipi Chains",
    angle: 205.6,
    theme: {
      id: "midcentury",
      bgClass: "theme-1947",
      accent: "#e09132",
      mapFill: "#241f18",
      mapStroke: "#9e6927",
      glow: "rgba(224, 145, 50, 0.35)",
      fontEra: "'Cinzel Decorative', serif",
      chronicle: "In the crucible of Partition, refugee cooks from Peshawar settle in Delhi's Daryaganj, transforming the clay tandoor into a national phenomenon with Butter Chicken and Dal Makhani. In the south, migrant Udipi restaurateurs popularize crisp Masala Dosas nationwide."
    }
  },
  {
    id: 1980,
    year: 1980,
    label: "1980",
    roman: "MCMLXXX",
    title: "Green Revolution & Street Food Boom",
    subtitle: "Bombay Pav Bhaji, Kolkata Tangra Chinese & State Bhavans",
    angle: 257.0,
    theme: {
      id: "retro",
      bgClass: "theme-1980",
      accent: "#e5a93b",
      mapFill: "#1d1a16",
      mapStroke: "#946f25",
      glow: "rgba(229, 169, 59, 0.35)",
      fontEra: "'Outfit', sans-serif",
      chronicle: "Post-Green Revolution urbanization fuels an explosive street food culture. Tawa-sizzled Pav Bhaji feeds Mumbai mill workers, Tangra's Hakka diaspora invents Indo-Chinese Chilli Chicken in Kolkata, and Delhi's state bhavans introduce pan-Indian regional thalis."
    }
  },
  {
    id: 2020,
    year: 2020,
    label: "2020",
    roman: "MMXX",
    title: "Hyper-Local Revival & Modern Gastronomy",
    subtitle: "Heirloom Millets, Foraged Wild Greens & Progressive Indian Dining",
    angle: 308.4,
    theme: {
      id: "contemporary",
      bgClass: "theme-2020",
      accent: "#e6b04c",
      mapFill: "#131317",
      mapStroke: "#423b30",
      glow: "rgba(230, 176, 76, 0.45)",
      fontEra: "'Outfit', sans-serif",
      chronicle: "A revolutionary renaissance. Culinary scholars and chefs resurrect forgotten indigenous millets, remote Himalayan seabuckthorn, Northeast fermented bamboo shoots, and ancestral cold-pressed seed oils—celebrating India's biodiversity with progressive culinary artistry."
    }
  }
];
`;

fs.writeFileSync('scripts/eraConfig.js', script);
console.log('Saved scripts/eraConfig.js');
