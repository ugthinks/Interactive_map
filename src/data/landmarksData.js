// ==========================================================================
// LIVING HERITAGE MAP — ARCHITECTURAL LANDMARKS & PILGRIMAGE SITES ARCHIVE
// Authentic Famous Landmarks for All 36 Indian States and Union Territories
// ==========================================================================

export const NATURAL_LABELS = [
  { id: 'ladakh', name: 'LADAKH', pos: [346, 52], anchor: [346, 115], align: 'middle' },
  { id: 'jammu-and-kashmir', name: 'J&K', pos: [232, 148], anchor: [275, 168], align: 'end' },
  { id: 'himachal-pradesh', name: 'HIMACHAL PRADESH', pos: [438, 205], anchor: [385, 225], align: 'start' },
  { id: 'uttarakhand', name: 'UTTARAKHAND', pos: [490, 280], anchor: [445, 290], align: 'start' },
  { id: 'punjab', name: 'PUNJAB', pos: [232, 238], anchor: [275, 255], align: 'end' },
  { id: 'chandigarh', name: 'CHANDIGARH', pos: [270, 272], anchor: [340, 278], align: 'end' },
  { id: 'haryana', name: 'HARYANA', pos: [242, 312], anchor: [295, 320], align: 'end' },
  { id: 'delhi', name: 'DELHI', pos: [398, 335], anchor: [350, 345], align: 'start' },
  { id: 'rajasthan', name: 'RAJASTHAN', pos: [150, 385], anchor: [210, 395], align: 'end' },
  { id: 'gujarat', name: 'GUJARAT', pos: [95, 485], anchor: [140, 505], align: 'end' },
  { id: 'dadra-and-nagar-haveli-and-daman-and-diu', name: 'DAMAN & DIU', pos: [120, 585], anchor: [185, 598], align: 'end' },
  { id: 'maharashtra', name: 'MAHARASHTRA', pos: [175, 635], anchor: [245, 635], align: 'end' },
  { id: 'goa', name: 'GOA', pos: [180, 755], anchor: [232, 760], align: 'end' },
  { id: 'karnataka', name: 'KARNATAKA', pos: [205, 810], anchor: [265, 800], align: 'end' },
  { id: 'kerala', name: 'KERALA', pos: [235, 915], anchor: [285, 915], align: 'end' },
  { id: 'lakshadweep', name: 'LAKSHADWEEP', pos: [145, 975], anchor: [197.9, 985.2], align: 'end' },
  { id: 'tamil-nadu', name: 'TAMIL NADU', pos: [465, 925], anchor: [405, 915], align: 'start' },
  { id: 'puducherry', name: 'PUDUCHERRY', pos: [475, 875], anchor: [428, 880], align: 'start' },
  { id: 'andhra-pradesh', name: 'ANDHRA PRADESH', pos: [515, 765], anchor: [455, 755], align: 'start' },
  { id: 'telangana', name: 'TELANGANA', pos: [465, 705], anchor: [418, 695], align: 'start' },
  { id: 'madhya-pradesh', name: 'MADHYA PRADESH', pos: [245, 535], anchor: [315, 520], align: 'end' },
  { id: 'uttar-pradesh', name: 'UTTAR PRADESH', pos: [520, 365], anchor: [475, 385], align: 'start' },
  { id: 'bihar', name: 'BIHAR', pos: [580, 365], anchor: [585, 415], align: 'start' },
  { id: 'jharkhand', name: 'JHARKHAND', pos: [635, 495], anchor: [605, 505], align: 'start' },
  { id: 'chhattisgarh', name: 'CHHATTISGARH', pos: [490, 655], anchor: [485, 615], align: 'start' },
  { id: 'odisha', name: 'ODISHA', pos: [645, 625], anchor: [595, 610], align: 'start' },
  { id: 'west-bengal', name: 'WEST BENGAL', pos: [695, 565], anchor: [665, 535], align: 'start' },
  { id: 'sikkim', name: 'SIKKIM', pos: [640, 320], anchor: [667, 368], align: 'middle' },
  { id: 'arunachal-pradesh', name: 'ARUNACHAL PRADESH', pos: [835, 280], anchor: [840, 335], align: 'middle' },
  { id: 'assam', name: 'ASSAM', pos: [755, 368], anchor: [780, 395], align: 'start' },
  { id: 'nagaland', name: 'NAGALAND', pos: [895, 405], anchor: [855, 415], align: 'start' },
  { id: 'meghalaya', name: 'MEGHALAYA', pos: [720, 465], anchor: [745, 445], align: 'end' },
  { id: 'manipur', name: 'MANIPUR', pos: [880, 465], anchor: [842, 462], align: 'start' },
  { id: 'tripura', name: 'TRIPURA', pos: [735, 535], anchor: [762, 505], align: 'end' },
  { id: 'mizoram', name: 'MIZORAM', pos: [835, 530], anchor: [805, 515], align: 'start' },
  { id: 'andaman-and-nicobar-islands', name: 'ANDAMAN & NICOBAR', pos: [740, 855], anchor: [815, 875], align: 'end' }
];

export const ERA_PALETTES = {
  1700: {
    accent: '#d4af37',      // Antique Champagne Gold
    glow: 'rgba(212, 175, 55, 0.5)',
    borderUnder: '#090704',
    label: '#e0c15d',
    line: '#d4af37'
  },
  1765: {
    accent: '#df7d48',      // Warm Copper
    glow: 'rgba(223, 125, 72, 0.5)',
    borderUnder: '#0a0604',
    label: '#e58e5e',
    line: '#df7d48'
  },
  1857: {
    accent: '#a88d65',      // Aged Bronze
    glow: 'rgba(168, 141, 101, 0.5)',
    borderUnder: '#070707',
    label: '#ba9f77',
    line: '#a88d65'
  },
  1911: {
    accent: '#c9a55c',      // Muted Brass
    glow: 'rgba(201, 165, 92, 0.5)',
    borderUnder: '#080705',
    label: '#d4b36e',
    line: '#c9a55c'
  },
  1947: {
    accent: '#e6b944',      // Rich Heritage Gold
    glow: 'rgba(230, 185, 68, 0.5)',
    borderUnder: '#0a0804',
    label: '#f0c656',
    line: '#e6b944'
  },
  1980: {
    accent: '#e5973b',      // Warm Amber
    glow: 'rgba(229, 151, 59, 0.5)',
    borderUnder: '#0a0703',
    label: '#f0a852',
    line: '#e5973b'
  },
  2020: {
    accent: '#f0d584',      // Bright Champagne Gold
    glow: 'rgba(240, 213, 132, 0.5)',
    borderUnder: '#0a0906',
    label: '#f5df9e',
    line: '#f0d584'
  }
};

export const LANDMARKS_DATA = [
  // 1. Uttar Pradesh
  {
    id: 'taj-mahal',
    stateId: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    name: 'Taj Mahal',
    city: 'Agra',
    category: 'UNESCO World Heritage Monument',
    image: '/assets/landmarks/uttar-pradesh.jpg',
    builtYear: 1653,
    periodText: 'Built 1631–1653 CE • Mughal Imperial Architecture',
    coordinates: [445, 402],
    description: 'The world-famous ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned by Emperor Shah Jahan to enshrine the tomb of Mumtaz Mahal.',
    attribution: 'Wikimedia Commons / Archaeological Survey of India (ASI)'
  },

  // 2. Rajasthan
  {
    id: 'hawa-mahal',
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    name: 'Hawa Mahal',
    city: 'Jaipur',
    category: 'Royal Rajput Architectural Heritage',
    image: '/assets/landmarks/rajasthan.jpg',
    builtYear: 1799,
    periodText: 'Built 1799 CE • Maharaja Sawai Pratap Singh • Red & Pink Sandstone',
    coordinates: [254, 407],
    description: 'The iconic five-storey "Palace of Winds" featuring 953 intricately carved jharokha honeycomb windows in the heart of the Pink City.',
    attribution: 'Wikimedia Commons / Department of Archaeology, Rajasthan'
  },

  // 3. Punjab
  {
    id: 'golden-temple',
    stateId: 'punjab',
    stateName: 'Punjab',
    name: 'Golden Temple (Sri Harmandir Sahib)',
    city: 'Amritsar',
    category: 'Preeminent Sikh Spiritual Shrine',
    image: '/assets/landmarks/punjab.jpg',
    builtYear: 1604,
    periodText: 'Founded 1577 CE • Guru Arjan Dev Ji • Gold Plating by Maharaja Ranjit Singh',
    coordinates: [304, 273],
    description: 'The gilded sanctum reflecting in the sacred Amrit Sarovar, open to people of all faiths with continuous kirtan and round-the-clock langar.',
    attribution: 'Wikimedia Commons / SGPC'
  },

  // 4. Delhi
  {
    id: 'red-fort',
    stateId: 'delhi',
    stateName: 'Delhi',
    name: 'Red Fort (Lal Qila)',
    city: 'Old Delhi',
    category: 'UNESCO World Heritage Mughal Fortress',
    image: '/assets/landmarks/delhi.jpg',
    builtYear: 1648,
    periodText: 'Built 1638–1648 CE • Emperor Shah Jahan • Red Sandstone Ramparts',
    coordinates: [348, 345],
    description: 'The monumental fortress of the Mughal emperors along the Yamuna, featuring the grand Lahori Gate, Diwan-i-Aam, and Diwan-i-Khas.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 5. Ladakh
  {
    id: 'thiksey-monastery',
    stateId: 'ladakh',
    stateName: 'Ladakh',
    name: 'Thiksey Monastery',
    city: 'Leh District',
    category: 'Tibetan Buddhist Gelug Gompa',
    image: '/assets/landmarks/ladakh.jpg',
    builtYear: 1430,
    periodText: 'Founded 1430 CE • 12-Story Hillside Monastic Complex',
    coordinates: [346, 142],
    description: 'A magnificent 12-story whitewashed gompa perched on a hill in the Indus Valley, resembling Tibet’s Potala Palace with a 15-metre Maitreya Buddha statue.',
    attribution: 'Wikimedia Commons'
  },

  // 6. Jammu and Kashmir
  {
    id: 'martand-sun-temple',
    stateId: 'jammu-and-kashmir',
    stateName: 'Jammu and Kashmir',
    name: 'Martand Sun Temple',
    city: 'Anantnag',
    category: 'Ancient Classical Stone Temple',
    image: '/assets/landmarks/jammu-and-kashmir.jpg',
    builtYear: 750,
    periodText: 'Built 8th Century CE • King Lalitaditya Muktapida (Karkota Dynasty)',
    coordinates: [293, 182],
    description: 'Colossal stone colonnades and fluted Greco-Roman-Kashmiri peristyle ruins dedicated to Surya, overlooking the Kashmir Valley.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 7. Himachal Pradesh
  {
    id: 'hidimba-devi',
    stateId: 'himachal-pradesh',
    stateName: 'Himachal Pradesh',
    name: 'Hidimba Devi Temple',
    city: 'Manali',
    category: 'Ancient Wooden Pagoda Sanctuary',
    image: '/assets/landmarks/himachal-pradesh.jpg',
    builtYear: 1553,
    periodText: 'Built 1553 CE • Maharaja Bahadur Singh • Kath-Kuni Pagoda Style',
    coordinates: [355, 240],
    description: 'A four-tiered wooden pagoda temple with exquisite wood carvings and a brass cone finial, sheltered within dense Himalayan cedar groves.',
    attribution: 'Wikimedia Commons / HP Tourism'
  },

  // 8. Uttarakhand
  {
    id: 'kedarnath-temple',
    stateId: 'uttarakhand',
    stateName: 'Uttarakhand',
    name: 'Kedarnath Temple',
    city: 'Rudraprayag District',
    category: 'Sacred Himalayan Jyotirlinga Shrine',
    image: '/assets/landmarks/uttarakhand.jpg',
    builtYear: 800,
    periodText: 'Rebuilt 8th Century CE by Adi Shankaracharya • Garhwal Himalayas',
    coordinates: [408, 299],
    description: 'Ancient grey granite temple at 3,583 metres altitude near the Mandakini River, flanked by snow-clad Himalayan peaks.',
    attribution: 'Wikimedia Commons'
  },

  // 9. Haryana
  {
    id: 'brahma-sarovar',
    stateId: 'haryana',
    stateName: 'Haryana',
    name: 'Kurukshetra Brahma Sarovar',
    city: 'Kurukshetra',
    category: 'Sacred Water Reservoir & Mahabharata Heritage',
    image: '/assets/landmarks/haryana.jpg',
    builtYear: 1000,
    periodText: 'Ancient Vedic Heritage • Massive Stone Ghats',
    coordinates: [328, 327],
    description: 'The vast sacred water reservoir mentioned in ancient scriptures, famous for solar eclipse gatherings and the bronze Krishna-Arjuna chariot.',
    attribution: 'Wikimedia Commons / KDB'
  },

  // 10. Chandigarh
  {
    id: 'rock-garden',
    stateId: 'chandigarh',
    stateName: 'Chandigarh',
    name: 'Rock Garden of Chandigarh',
    city: 'Sector 1, Chandigarh',
    category: 'Visionary Folk Art Sculpture Park',
    image: '/assets/landmarks/chandigarh.jpg',
    builtYear: 1976,
    periodText: 'Created 1957–1976 CE • Nek Chand • Recycled Industrial Materials',
    coordinates: [341, 279],
    description: 'World-famous 40-acre sculpture park crafted entirely from recycled urban waste, ceramic tiles, and natural stones.',
    attribution: 'Wikimedia Commons / Nek Chand Foundation'
  },

  // 11. Gujarat
  {
    id: 'sun-temple-modhera',
    stateId: 'gujarat',
    stateName: 'Gujarat',
    name: 'Sun Temple, Modhera',
    city: 'Mehsana District',
    category: 'Solanki Dynasty Classical Architecture',
    image: '/assets/landmarks/gujarat.jpg',
    builtYear: 1026,
    periodText: 'Built 1026–1027 CE • King Bhima I (Solanki Dynasty)',
    coordinates: [181, 526],
    description: 'A monument to Surya featuring the intricately carved Sabha Mandap, Guda Mandap, and the magnificent stepped Surya Kund reservoir.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 12. Madhya Pradesh
  {
    id: 'kandariya-mahadeva',
    stateId: 'madhya-pradesh',
    stateName: 'Madhya Pradesh',
    name: 'Kandariya Mahadeva Temple',
    city: 'Khajuraho',
    category: 'UNESCO World Heritage Nagara Temple',
    image: '/assets/landmarks/madhya-pradesh.jpg',
    builtYear: 1030,
    periodText: 'Built 1030 CE • Chandela Dynasty • Nagara Architecture',
    coordinates: [377, 508],
    description: 'The largest and most ornate temple of the Khajuraho complex, famous for its soaring mountain-like sandstone shikhara and intricate sculptures.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 13. Maharashtra
  {
    id: 'gateway-of-india',
    stateId: 'maharashtra',
    stateName: 'Maharashtra',
    name: 'Gateway of India',
    city: 'Mumbai',
    category: 'Indo-Saracenic Monumental Basalt Arch',
    image: '/assets/landmarks/maharashtra.jpg',
    builtYear: 1924,
    periodText: 'Built 1911–1924 CE • George Wittet • Yellow Basalt',
    coordinates: [309, 635],
    description: 'The monumental 26-metre triumphal basalt arch overlooking Mumbai harbour and the Arabian Sea.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 14. Goa
  {
    id: 'basilica-bom-jesus',
    stateId: 'goa',
    stateName: 'Goa',
    name: 'Basilica of Bom Jesus',
    city: 'Old Goa',
    category: 'UNESCO World Heritage Baroque Church',
    image: '/assets/landmarks/goa.jpg',
    builtYear: 1605,
    periodText: 'Built 1594–1605 CE • Jesuit Baroque Architecture',
    coordinates: [242, 761],
    description: 'A landmark church with an unplastered red laterite facade, enshrining the sacred relics of St. Francis Xavier in a silver casket.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 15. Karnataka
  {
    id: 'mysore-palace',
    stateId: 'karnataka',
    stateName: 'Karnataka',
    name: 'Mysore Palace',
    city: 'Mysuru',
    category: 'Indo-Saracenic Royal Palace of the Wadiyars',
    image: '/assets/landmarks/karnataka.jpg',
    builtYear: 1912,
    periodText: 'Built 1897–1912 CE • Henry Irwin • Wadiyar Dynasty',
    coordinates: [305, 785],
    description: 'The royal seat of the Wadiyar dynasty, renowned for its grey granite facade, deep pink marble domes, and 100,000 festival illuminations.',
    attribution: 'Wikimedia Commons / Mysore Palace Board'
  },

  // 16. Kerala
  {
    id: 'padmanabhaswamy',
    stateId: 'kerala',
    stateName: 'Kerala',
    name: 'Padmanabhaswamy Temple',
    city: 'Thiruvananthapuram',
    category: 'Chera-Dravidian Temple & Royal Shrine',
    image: '/assets/landmarks/kerala.jpg',
    builtYear: 1750,
    periodText: 'Major Reconstruction 1731–1750 CE • Marthanda Varma',
    coordinates: [308, 921],
    description: 'Famous for its 100-foot 7-tier granite gopuram, 365 carved corridor pillars, and sacred reclining Vishnu sanctum.',
    attribution: 'Wikimedia Commons'
  },

  // 17. Tamil Nadu
  {
    id: 'brihadeeswara-temple',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    name: 'Brihadeeswara Temple',
    city: 'Thanjavur',
    category: 'UNESCO World Heritage Great Living Chola Temple',
    image: '/assets/landmarks/tamil-nadu.jpg',
    builtYear: 1010,
    periodText: 'Built 1003–1010 CE • Emperor Raja Raja Chola I • Monolithic Granite',
    coordinates: [371, 905],
    description: 'The monumental Chola granite temple with a 216-foot vimana topped by an 80-tonne monolithic stone capstone.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 18. Andhra Pradesh
  {
    id: 'tirumala-venkateswara',
    stateId: 'andhra-pradesh',
    stateName: 'Andhra Pradesh',
    name: 'Tirumala Venkateswara Temple',
    city: 'Tirupati',
    category: 'Sacred Hilltop Temple & Pilgrimage Shrine',
    image: '/assets/landmarks/andhra-pradesh.jpg',
    builtYear: 966,
    periodText: 'Ancient Dravidian Heritage • Gold Ananda Nilayam Vimana',
    coordinates: [421, 755],
    description: 'Perched in the Seshachalam Hills, the sacred temple features the golden Ananda Nilayam tower and welcomes millions of pilgrims.',
    attribution: 'Wikimedia Commons / TTD'
  },

  // 19. Telangana
  {
    id: 'charminar',
    stateId: 'telangana',
    stateName: 'Telangana',
    name: 'Charminar',
    city: 'Hyderabad',
    category: 'Qutb Shahi Monumental Arch & Mosque',
    image: '/assets/landmarks/telangana.jpg',
    builtYear: 1591,
    periodText: 'Built 1591 CE • Muhammad Quli Qutb Shah • Stucco & Granite',
    coordinates: [394, 690],
    description: 'The historic signature four-minaret monument and mosque anchoring the old city of Hyderabad with bustling bazaars.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 20. Chhattisgarh
  {
    id: 'bhoramdeo-temple',
    stateId: 'chhattisgarh',
    stateName: 'Chhattisgarh',
    name: 'Bhoramdeo Temple',
    city: 'Kawardha',
    category: 'Ancient Nagara Stone Temple',
    image: '/assets/landmarks/chhattisgarh.jpg',
    builtYear: 1089,
    periodText: 'Built 1089 CE • Nagavanshi King Gopal Dev • Maikal Hills',
    coordinates: [485, 582],
    description: 'Known as the "Khajuraho of Chhattisgarh", this 11th-century sandstone Shiva temple is nestled amidst lush sal forests.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 21. Odisha
  {
    id: 'konark-sun-temple',
    stateId: 'odisha',
    stateName: 'Odisha',
    name: 'Konark Sun Temple',
    city: 'Konark',
    category: 'UNESCO World Heritage Monumental Stone Chariot',
    image: '/assets/landmarks/odisha.jpg',
    builtYear: 1250,
    periodText: 'Built 1250 CE • King Narasimhadeva I • Kalinga Architecture',
    coordinates: [556, 605],
    description: 'A 13th-century chariot of Surya carved from stone with 24 carved wheels pulled by seven horses along the Bay of Bengal.',
    attribution: 'Wikimedia Commons / ASI'
  },

  // 22. West Bengal
  {
    id: 'victoria-memorial',
    stateId: 'west-bengal',
    stateName: 'West Bengal',
    name: 'Victoria Memorial',
    city: 'Kolkata',
    category: 'Makrana Marble Monument & Museum',
    image: '/assets/landmarks/west-bengal.jpg',
    builtYear: 1921,
    periodText: 'Built 1906–1921 CE • Sir William Emerson • Makrana Marble',
    coordinates: [657, 498],
    description: 'The white marble palace on the Maidan, featuring a 16-foot bronze Angel of Victory and sprawling heritage gardens.',
    attribution: 'Wikimedia Commons / VMH'
  },

  // 23. Bihar
  {
    id: 'mahabodhi-temple',
    stateId: 'bihar',
    stateName: 'Bihar',
    name: 'Mahabodhi Temple',
    city: 'Bodh Gaya',
    category: 'UNESCO World Heritage Buddhist Enlightenment Site',
    image: '/assets/landmarks/bihar.jpg',
    builtYear: 260,
    periodText: 'Original 3rd Century BCE by Ashoka • Grand Brick Temple 5th Century CE',
    coordinates: [588, 441],
    description: 'The holiest shrine of Buddhism marking the exact location where Siddhartha Gautama attained Enlightenment beneath the Bodhi Tree.',
    attribution: 'Wikimedia Commons / BTMC'
  },

  // 24. Jharkhand
  {
    id: 'baidyanath-dham',
    stateId: 'jharkhand',
    stateName: 'Jharkhand',
    name: 'Baidyanath Jyotirlinga Temple',
    city: 'Deoghar',
    category: 'Sacred Shiva Jyotirlinga Shrine',
    image: '/assets/landmarks/jharkhand.jpg',
    builtYear: 1596,
    periodText: 'Restored 1596 CE by Raja Puran Mal • Shravani Mela Destination',
    coordinates: [587, 505],
    description: 'A 72-foot stone temple dedicated to Shiva where millions of saffron-clad Kanwariyas walk 108 km carrying sacred Ganges water.',
    attribution: 'Wikimedia Commons'
  },

  // 25. Sikkim
  {
    id: 'rumtek-monastery',
    stateId: 'sikkim',
    stateName: 'Sikkim',
    name: 'Rumtek Monastery',
    city: 'Gangtok',
    category: 'Tibetan Buddhist Karma Kagyu Seat',
    image: '/assets/landmarks/sikkim.jpg',
    builtYear: 1966,
    periodText: 'Rebuilt 1962–1966 CE by the 16th Karmapa • Dharmachakra Centre',
    coordinates: [667, 379],
    description: 'The main seat of the Karma Kagyu lineage in exile, featuring golden stupas, vivid Buddhist frescoes, and mountain views.',
    attribution: 'Wikimedia Commons'
  },

  // 26. Arunachal Pradesh
  {
    id: 'tawang-monastery',
    stateId: 'arunachal-pradesh',
    stateName: 'Arunachal Pradesh',
    name: 'Tawang Monastery',
    city: 'Tawang Valley',
    category: 'Largest Monastery in India',
    image: '/assets/landmarks/arunachal-pradesh.jpg',
    builtYear: 1681,
    periodText: 'Founded 1680–1681 CE • Merag Lama • 5th Dalai Lama',
    coordinates: [841, 355],
    description: 'Perched at 3,000 metres elevation like a medieval fortified citadel, housing 450 monks and an 8-metre gilded Buddha statue.',
    attribution: 'Wikimedia Commons'
  },

  // 27. Assam
  {
    id: 'kamakhya-temple',
    stateId: 'assam',
    stateName: 'Assam',
    name: 'Kamakhya Temple',
    city: 'Guwahati',
    category: 'Sacred Tantric Shakti Peetha',
    image: '/assets/landmarks/assam.jpg',
    builtYear: 1565,
    periodText: 'Rebuilt 1565 CE by King Naranarayana • Nilachal Hill Style',
    coordinates: [792, 411],
    description: 'The ancient Shakti Peetha overlooking the Brahmaputra River, famous for its beehive shikhara and the annual Ambubachi Mela.',
    attribution: 'Wikimedia Commons'
  },

  // 28. Meghalaya
  {
    id: 'living-root-bridges',
    stateId: 'meghalaya',
    stateName: 'Meghalaya',
    name: 'Living Root Bridges',
    city: 'Cherrapunji / Sohra',
    category: 'Indigenous Bio-Engineering Wonder',
    image: '/assets/landmarks/meghalaya.jpg',
    builtYear: 1800,
    periodText: 'Centuries-Old Khasi & Jaintia Living Ficus Elastica Bio-Architecture',
    coordinates: [750, 440],
    description: 'Pedestrian bridges aerial-grown from living Ficus elastica tree roots across mountain streams, growing stronger over centuries.',
    attribution: 'Wikimedia Commons'
  },

  // 29. Nagaland
  {
    id: 'kisama-village',
    stateId: 'nagaland',
    stateName: 'Nagaland',
    name: 'Kisama Heritage Village',
    city: 'Kohima District',
    category: 'Traditional Naga Morung Architecture & Hornbill Hub',
    image: '/assets/landmarks/nagaland.jpg',
    builtYear: 2000,
    periodText: 'Traditional Morung Architecture • Annual Hornbill Festival Arena',
    coordinates: [840, 418],
    description: 'The cultural village preserving traditional architectural Morung communal halls representing the 16 major Naga tribes.',
    attribution: 'Wikimedia Commons'
  },

  // 30. Manipur
  {
    id: 'kangla-fort',
    stateId: 'manipur',
    stateName: 'Manipur',
    name: 'Kangla Fort',
    city: 'Imphal',
    category: 'Ancient Meitei Royal Palace & Citadel',
    image: '/assets/landmarks/manipur.jpg',
    builtYear: 1618,
    periodText: 'Ancient Seat of Meitei Kings • Fortified by King Khagemba',
    coordinates: [826, 461],
    description: 'The historic royal capital on the Imphal River, featuring moat fortifications, royal coronation halls, and the sacred Kangla Sha dragon statues.',
    attribution: 'Wikimedia Commons'
  },

  // 31. Mizoram
  {
    id: 'solomons-temple',
    stateId: 'mizoram',
    stateName: 'Mizoram',
    name: 'Solomon’s Temple',
    city: 'Aizawl',
    category: 'White Marble Cathedral Sanctuary',
    image: '/assets/landmarks/mizoram.jpg',
    builtYear: 2017,
    periodText: 'Built 1996–2017 CE • White Marble Architectural Marvel',
    coordinates: [799, 508],
    description: 'A grand white marble temple constructed on an Aizawl mountain ridge in the Lushai Hills, accommodating 3,000 worshippers with four spires.',
    attribution: 'Wikimedia Commons'
  },

  // 32. Tripura
  {
    id: 'ujjayanta-palace',
    stateId: 'tripura',
    stateName: 'Tripura',
    name: 'Ujjayanta Palace',
    city: 'Agartala',
    category: 'Neoclassical Royal Palace & State Museum',
    image: '/assets/landmarks/tripura.jpg',
    builtYear: 1901,
    periodText: 'Built 1899–1901 CE • Maharaja Radha Kishore Manikya',
    coordinates: [766, 496],
    description: 'The white neoclassical palace surrounded by Mughal-style lake gardens, named by Rabindranath Tagore, now housing the state museum.',
    attribution: 'Wikimedia Commons'
  },

  // 33. Andaman and Nicobar Islands
  {
    id: 'cellular-jail',
    stateId: 'andaman-and-nicobar-islands',
    stateName: 'Andaman and Nicobar Islands',
    name: 'Cellular Jail (Kala Pani)',
    city: 'Port Blair',
    category: 'National Memorial of the Freedom Struggle',
    image: '/assets/landmarks/andaman-and-nicobar-islands.jpg',
    builtYear: 1906,
    periodText: 'Built 1896–1906 CE • Seven Radial Wings & Central Watchtower',
    coordinates: [826, 888],
    description: 'The historic colonial panopticon prison where Indian freedom fighters were exiled, now a national memorial.',
    attribution: 'Wikimedia Commons'
  },

  // 34. Dadra and Nagar Haveli and Daman and Diu
  {
    id: 'diu-fort',
    stateId: 'dadra-and-nagar-haveli-and-daman-and-diu',
    stateName: 'Dadra and Nagar Haveli and Daman and Diu',
    name: 'Diu Fort',
    city: 'Diu Island',
    category: 'Coastal Portuguese Renaissance Sea Fortress',
    image: '/assets/landmarks/dadra-and-nagar-haveli-and-daman-and-diu.jpg',
    builtYear: 1535,
    periodText: 'Built 1535–1546 CE • Portuguese Military Architecture',
    coordinates: [218, 606],
    description: 'A sea citadel surrounded by the Arabian Sea on three sides, featuring double stone ramparts, historic bronze cannons, and a lighthouse.',
    attribution: 'Wikimedia Commons'
  },

  // 35. Lakshadweep
  {
    id: 'kavaratti-atoll',
    stateId: 'lakshadweep',
    stateName: 'Lakshadweep',
    name: 'Kavaratti Lagoon & Ujra Mosque',
    city: 'Kavaratti Island',
    category: 'Coral Atoll Heritage & Historic Coral-Stone Architecture',
    image: '/assets/landmarks/lakshadweep.jpg',
    builtYear: 1650,
    periodText: '17th Century Driftwood Carvings & Turquoise Lagoons',
    coordinates: [198, 985],
    description: 'The tranquil capital atoll featuring white sandy beaches, turquoise lagoons, and the 17th-century Ujra Mosque with carved ceilings.',
    attribution: 'Wikimedia Commons'
  },

  // 36. Puducherry
  {
    id: 'matrimandir',
    stateId: 'puducherry',
    stateName: 'Puducherry',
    name: 'Matrimandir',
    city: 'Auroville',
    category: 'Golden Geodesic Sphere of Universal Harmony',
    image: '/assets/landmarks/puducherry.jpg',
    builtYear: 2008,
    periodText: 'Conceived 1968 • Mirra Alfassa (The Mother) • Golden Discs',
    coordinates: [417, 886],
    description: 'A 36-metre golden geodesic sphere surrounded by twelve petal gardens, housing an inner white marble meditation chamber with a pure crystal globe.',
    attribution: 'Wikimedia Commons / Auroville Foundation'
  }
];

export const HERITAGE_MAP = LANDMARKS_DATA.reduce((acc, item) => {
  acc[item.stateId] = item;
  return acc;
}, {});
