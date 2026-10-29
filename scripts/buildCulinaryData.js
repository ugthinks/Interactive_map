import fs from 'fs';

export const buildDatabase = () => {
  // Let's define the comprehensive culinary data
  const data = {};

  // Helper to build state structure
  const makeState = (id, name, region, culinaryTitle, historicalIntro, indigenousIngredients, eraMap) => {
    return {
      id,
      name,
      region,
      culinaryTitle,
      historicalIntro,
      indigenousIngredients,
      eras: eraMap
    };
  };

  // 1. UTTAR PRADESH
  data['uttar-pradesh'] = makeState(
    'uttar-pradesh',
    'Uttar Pradesh',
    'North',
    'Cradle of Awadhi Dum Pukht & Ganga-Jamuni Tehzeeb',
    'Between the fertile doab of the Ganga and Yamuna and the imperial courts of Lucknow, Agra, and Varanasi, Uttar Pradesh cultivated one of the world\'s most sophisticated culinary traditions—where royal bawarchis turned food into poetry.',
    ['Awadhi Potli Masala', 'Kala Namak Rice', 'Rose Attar (Ittar)', 'Mustard Oil', 'Mahuwa Flowers', 'Hing (Asafoetida)', 'Khoya'],
    {
      1700: {
        eraTitle: 'Imperial Shahi Dastarkhwan & Khansama Guilds',
        eraStory: 'During the high Mughal era centered in Agra and Delhi, imperial khansamas perfected slow-cooked yakhni broths, scented with saffron, wild musk, and edible silver leaves (varq). Royal dastarkhwans placed immense emphasis on ceremonial presentation and meat tenderization techniques utilizing raw papaya and green figs.',
        cookingMethod: 'Slow braising in heavy brass degs over tamarind wood coals',
        signatureDish: 'Shahi Gosht Yakhni Pulao',
        signatureImage: '/assets/awadhi_dum_biryani.jpg',
        signatureFlavor: 'Subtle saffron, mace, sweet vetiver, green cardamom, rich mutton broth',
        dishes: [
          {
            name: 'Imperial Awadhi Yakhni Pulao',
            regionalOrigin: 'Agra & Lucknow',
            image: '/assets/awadhi_dum_biryani.jpg',
            tag: 'Royal Banquet',
            description: 'Fragrant long-grain rice par-cooked in an intensely spiced clarified mutton bone broth, finished with fried onions, crushed mace, and a drop of pure kewra water.',
            ingredients: ['Long Grain Basmati', 'Tender Goat Shank', 'Mace', 'Saffron', 'Desi Ghee', 'Rosewater'],
            culturalAnecdote: 'Mughal royal cooks were forbidden from using chili peppers; richness was derived entirely from almonds, pistachios, black cumin, and royal spices.'
          },
          {
            name: 'Pasanda Kebab on Sheermal',
            regionalOrigin: 'Old Agra',
            image: '/assets/galouti_kebab.jpg',
            tag: 'Court Speciality',
            description: 'Flattened tender lamb steaks marinated overnight in strained yogurt, raw papaya paste, and royal potli masala, grilled gently on tawa and served over saffron-rubbed Sheermal flatbread.',
            ingredients: ['Thin Sliced Lamb', 'Kachri Powder', 'Saffron Sheermal', 'Chironji Nuts'],
            culturalAnecdote: 'The word "Pasanda" derives from "pasand" (favorite)—only the most tender cuts of meat were selected for the Emperor\'s table.'
          }
        ]
      },
      1765: {
        eraTitle: 'The Invention of Dum Pukht under Nawab Asaf-ud-Daula',
        eraStory: 'When severe famine struck Awadh in 1784, Nawab Asaf-ud-Daula launched the construction of the colossal Bara Imambara to provide dignified employment. To feed thousands of workers day and night, royal bawarchis sealed huge brass cauldrons with wheat dough, letting rice, meat, and vegetables simmer gently in their own trapped aromatic steam—inventing the legendary "Dum Pukht" technique.',
        cookingMethod: 'Dum Pukht — airtight dough sealing in heavy copper lagans with hot charcoal on lids',
        signatureDish: 'Awadhi Dum Gosht Biryani',
        signatureImage: '/assets/awadhi_dum_biryani.jpg',
        signatureFlavor: 'Cardamom, ittar, caramelized shallots, velvet meat, gentle saffron heat',
        dishes: [
          {
            name: 'Awadhi Gosht Dum Biryani',
            regionalOrigin: 'Lucknow',
            image: '/assets/awadhi_dum_biryani.jpg',
            tag: 'Imperial Invention',
            description: 'Layered spiced mutton and aged basmati rice sealed inside a heavy lagan with kneaded atta dough, gently cooked over slow embers with embers heaped onto the lid so the fragrance recirculates endlessly.',
            ingredients: ['Aged Basmati Rice', 'Mutton Shoulder', 'Kewra Water', 'Saffron', 'Potli Masala', 'Fried Biryan Onions'],
            culturalAnecdote: 'When Nawab Asaf-ud-Daula caught the celestial fragrance wafting from the famine cauldrons, he immediately ordered his court bawarchis to refine the technique for the royal table.'
          },
          {
            name: 'Lucknowi Galouti Kebab',
            regionalOrigin: 'Lucknow (Chowk)',
            image: '/assets/galouti_kebab.jpg',
            tag: 'Nawabi Legend',
            description: 'Finely minced lamb passed through silk cloth seven times, infused with over 160 aromatic herbs and raw green papaya, shallow-fried on a concave copper tawa until it liquefies on the tongue.',
            ingredients: ['Minced Goat Meat', 'Raw Papaya Pulp', '160 Secret Spices', 'Pure Desi Ghee', 'Roomali Roti'],
            culturalAnecdote: 'Invented by royal chef Haji Mohammad Fakr-e-Alam for Nawab Asad-ud-Daula, who had lost his teeth with age but refused to surrender his passionate love for rich kebabs.'
          }
        ]
      },
      1857: {
        eraTitle: 'The Metiabruz Diaspora & Varanasi Halwai Guilds',
        eraStory: 'Following the 1857 uprising and the British annexation of Awadh, Nawab Wajid Ali Shah was exiled to Metiabruz, Kolkata. His royal bawarchis accompanied him, introducing golden browned potatoes into the biryani as a luxury delicacy. Concurrently, in Varanasi, ancient Hindu halwai traditions flourished around temple ghats, creating legendary morning breakfasts of crisp Bedmi Kachoris and cooling winter foams.',
        cookingMethod: 'Deep cast-iron kadai frying in cold-pressed mustard oil & open halwai tawa',
        signatureDish: 'Banarasi Bedmi Kachori with Hing Wale Aloo',
        signatureImage: '/assets/bedmi_kachori.jpg',
        signatureFlavor: 'Pungent hing (asafoetida), coarse urad dal, fenugreek, sour amchur, crispy crust',
        dishes: [
          {
            name: 'Banarasi Bedmi Kachori & Hing Aloo',
            regionalOrigin: 'Varanasi (Kashi)',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Temple Street Heritage',
            description: 'Crisp puffed whole wheat flatbreads stuffed with spiced urad dal paste, served beside a rich, gravy-soaked potato curry simmered with whole cumin, fenugreek, and fragrant roasted hing.',
            ingredients: ['Whole Wheat Flour', 'Urad Dal Pithi', 'Pungent Hing', 'Yukon Potatoes', 'Amchur', 'Green Chilies'],
            culturalAnecdote: 'Varanasi halwais boast that their potato gravy requires neither onion nor garlic; the divine fragrance comes solely from purest Hathras asafoetida.'
          },
          {
            name: 'Makhan Malai (Nimish)',
            regionalOrigin: 'Lucknow & Varanasi',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Winter Morning Miracle',
            description: 'Full-cream milk boiled, cooled, and left outdoors overnight under the open winter sky to capture the morning dew, then vigorously churned at dawn into an ethereal, cloud-like sweet froth scented with saffron and rose.',
            ingredients: ['Dew-Chilled Milk Foam', 'Kashmiri Saffron', 'Pounded Pistachios', 'Silver Leaf', 'Kewra Essence'],
            culturalAnecdote: 'Available only between November and February; legend says if morning dew does not touch the earthen vat, the delicate foam will collapse before noon.'
          }
        ]
      },
      1911: {
        eraTitle: 'Rampuri Royal Kitchens & Old City Chaat Circuits',
        eraStory: 'While the British shifted their capital to Delhi in 1911, the Nawabs of Rampur gathered refugee chefs from fallen courts, creating the legendary Rampuri cuisine known for fiery yellow chili powder and royal taar korma. In Mathura and Kanpur, halwai communities perfected pedas and savory khasta kachoris with spicy tamarind chutney.',
        cookingMethod: 'Charcoal deg and heavy iron tawas',
        signatureDish: 'Rampuri Taar Gosht Korma',
        signatureImage: '/assets/galouti_kebab.jpg',
        signatureFlavor: 'Rampuri yellow chili, coriander root, bone gelatin, fried onion paste',
        dishes: [
          {
            name: 'Rampuri Taar Korma',
            regionalOrigin: 'Rampur',
            image: '/assets/galouti_kebab.jpg',
            tag: 'Princely Feast',
            description: 'A deeply aromatic mutton curry slow-cooked until the rich bone marrow dissolves into a silky, glistening sauce ("taar" meaning single thread consistency).',
            ingredients: ['Mutton with Bone Marrow', 'Rampuri Yellow Chili', 'Curd', 'Fried Onion Paste', 'Green Cardamom'],
            culturalAnecdote: 'Rampuri nawabs took pride in dishes with deceptive simplicity—spices were ground with sandalwood and rose petals so no single spice overpowered the meat.'
          },
          {
            name: 'Mathura ke Pede',
            regionalOrigin: 'Mathura',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Temple Heritage',
            description: 'Slow-caramelized milk solids (mawa) roasted tirelessly in brass kadhais until deep amber, dusted with ground sugar and green cardamom.',
            ingredients: ['Buffalo Milk Khoya', 'Bura Sugar', 'Cardamom Powder', 'Ghee'],
            culturalAnecdote: 'Devotees believe Lord Krishna himself was fond of these dark roasted sweets, which retain their flavor for weeks without refrigeration.'
          }
        ]
      },
      1947: {
        eraTitle: 'Partition Hearth & Aminabad Halwai Expansion',
        eraStory: 'Independence and Partition brought waves of displaced culinary families to Uttar Pradesh. Lucknow\'s historic Aminabad market became a bustling crossroads where generational kebab maestros like Tunday Kababi expanded their street stalls, while displaced Punjabi halwais set up tandoors in Kanpur and Agra, blending Northwest grilling with Ganga-Jamuni spices.',
        cookingMethod: 'Open charcoal tawa shallow frying and street-side iron kadhais',
        signatureDish: 'Tunday Ke Kebab with Ulte Tawe Ka Paratha',
        signatureImage: '/assets/galouti_kebab.jpg',
        signatureFlavor: 'Clove smoke, coriander seed, roasted chana dal, melt-in-mouth texture',
        dishes: [
          {
            name: 'Aminabad Tunday Kebab',
            regionalOrigin: 'Lucknow (Aminabad)',
            image: '/assets/galouti_kebab.jpg',
            tag: 'Street Legend',
            description: 'Buffalo or goat meat kebabs made with a legendary spice blend of 160 secret botanical ingredients, cooked on a large inverted iron tawa with pure desi ghee.',
            ingredients: ['Finely Minced Meat', 'Ulte Tawe Ka Paratha', 'Secret Masala Blend', 'Mint Chutney'],
            culturalAnecdote: 'The one-armed maestro Haji Murad Ali gained the affectionate nickname "Tunday" (one-armed), turning what seemed like a physical limitation into an immortal culinary empire.'
          },
          {
            name: 'Banarasi Tamatar Chaat',
            regionalOrigin: 'Varanasi',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Iconic Street Snack',
            description: 'Mashed spicy tomatoes cooked on an iron griddle with boiled potatoes, hing, roasted cumin, and cashews, topped with a ladle of sweet sugar-tamarind syrup and crisp namakpara.',
            ingredients: ['Ripe Country Tomatoes', 'Mashed Potatoes', 'Roasted Cumin Syrup', 'Crisp Namakpara', 'Lemon Juice'],
            culturalAnecdote: 'Unique to Varanasi, this chaat is famously served piping hot in unglazed terracotta bowls (kullhad).'
          }
        ]
      },
      1980: {
        eraTitle: 'Ganga-Jamuni Street Food Boom & Halwai Guilds',
        eraStory: 'During the 1980s, Uttar Pradesh\'s vibrant bazaars—from Hazratganj in Lucknow to Godowlia in Varanasi—became famous across India for theatrical street snacks. Basket chaat, dahi gujiya, and cold spiced thandai made street snacking an artistic ritual of balance between sweet, sour, crunch, and fire.',
        cookingMethod: 'High-heat deep fry in vegetable oils & chilled earthenware clay pots',
        signatureDish: 'Lucknowi Tokri (Basket) Chaat',
        signatureImage: '/assets/bedmi_kachori.jpg',
        signatureFlavor: 'Crisp potato nest, whipped curd, tangy tamarind, mint-coriander zing, pomegranate pearls',
        dishes: [
          {
            name: 'Royal Tokri (Basket) Chaat',
            regionalOrigin: 'Hazratganj, Lucknow',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Modern Street Art',
            description: 'An intricate edible woven basket made of grated fried potato straws, loaded with sprouted lentils, spiced chickpeas, creamy sweet yogurt, green and date chutneys, and pomegranate seeds.',
            ingredients: ['Crisp Grated Potato Basket', 'Spiced Chana', 'Whipped Dahi', 'Saunth Chutney', 'Chaat Masala'],
            culturalAnecdote: 'Hazratganj evening strolls ("ganjing") were incomplete without crowding around royal chaat stalls to watch the masters assemble hundred-layered chaat baskets in seconds.'
          },
          {
            name: 'Benarasi Thandai with Malai',
            regionalOrigin: 'Varanasi Ghats',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Spiced Elixir',
            description: 'Thick creamy milk infused with stone-ground paste of almonds, fennel seeds, watermelon seeds, rose petals, black pepper, and topped with clotted malai and saffron.',
            ingredients: ['Full Cream Milk', 'Fennel & Almond Paste', 'Black Peppercorns', 'Rose Petals', 'Fresh Rabdi Float'],
            culturalAnecdote: 'Traditionally prepared during Mahashivratri and Holi as an offering to Lord Shiva, balancing hot spices with cooling seeds.'
          }
        ]
      },
      2020: {
        eraTitle: 'Heirloom Grain Revival & Progressive Awadhi Gastronomy',
        eraStory: 'In contemporary times, Uttar Pradesh has witnessed a renaissance of its ancient agricultural treasures—most notably the resurrection of Kala Namak rice ("Buddha’s Rice"), prized for its extraordinary aroma since the 6th century BCE. Modern chefs reinterpret Awadhi dum pukht methods while preserving sacred generational spice masalas.',
        cookingMethod: 'Artisanal clay pot dum cooking & low-temperature precision sous-vide',
        signatureDish: 'Kala Namak Heirloom Grain Pulao & Awadhi Galawat',
        signatureImage: '/assets/awadhi_dum_biryani.jpg',
        signatureFlavor: 'Earthy black grain fragrance, smoked ghee, edible floral extracts, aged mutton',
        dishes: [
          {
            name: 'Siddharthnagar Kala Namak Awadhi Biryani',
            regionalOrigin: 'Terai Belt & Lucknow',
            image: '/assets/awadhi_dum_biryani.jpg',
            tag: 'Heritage Grain Revival',
            description: 'An homage to the ancient black-husked Kala Namak rice of eastern UP, slow-cooked in a terracotta vessel with tender braised goat, saffron emulsion, and cold-pressed mustard oil.',
            ingredients: ['GI-Tagged Kala Namak Rice', 'Slow-Braised Goat', 'Heirloom Ittar', 'Mustard Seed Oil', 'Saffron Threads'],
            culturalAnecdote: 'Buddhist scriptures record that Lord Buddha gifted grains of Kala Namak rice to the people of Kapilavastu, blessing it to retain its heavenly fragrance forever.'
          },
          {
            name: 'Deconstructed Shahi Tukda with Gold Leaf',
            regionalOrigin: 'Contemporary Lucknow',
            image: '/assets/galouti_kebab.jpg',
            tag: 'Modern Heritage Dessert',
            description: 'Crisp ghee-fried brioche steeped in wild honey and saffron syrup, layered with stone-churned malai rabdi, silver leaf, and crushed Iranian pistachio dust.',
            ingredients: ['Artisanal Brioche', 'Wild Forest Honey', 'Cardamom Rabdi', 'Pistachio Flakes', 'Pure 24k Gold Leaf'],
            culturalAnecdote: 'Once a frugal way for royal kitchens to repurpose stale bread, Shahi Tukda has become the crowning dessert of northern celebratory feasts.'
          }
        ]
      }
    }
  );

  // 2. KERALA
  data['kerala'] = makeState(
    'kerala',
    'Kerala',
    'South',
    'The Malabar Spice Coast & Syrian Christian Hearth',
    'From the mist-draped cardamom hills of Wayanad to the sun-soaked backwaters of Alappuzha, Kerala\'s cuisine is steeped in thousands of years of international spice maritime trade, temple vegetarian feasting, and coastal seafood artistry.',
    ['Tellicherry Black Pepper', 'Malabar Cardamom', 'Kudampuli (Malabar Tamarind)', 'Cold-Pressed Coconut Oil', 'Pokkali Saline Rice', 'Curry Leaves', 'Small Shallots (Ulli)'],
    {
      1700: {
        eraTitle: 'The Zamorin\'s Pepper Monopoly & Arab Maritime Spice Feasts',
        eraStory: 'In the early 18th century, the port of Calicut (Kozhikode) was the epicenter of world spice trade. Arab merchants and local Mappila traders sailed dhows loaded with black pepper, nutmeg, and ginger. Mappila kitchens blended Yemeni and Persian meat preparation styles with native coconut milk and Tellicherry black pepper.',
        cookingMethod: 'Slow simmer in heavy cast bronze Uruli over coconut husk fire',
        signatureDish: 'Malabar Pepper Duck Roast with Steamed Appam',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Cracked Tellicherry pepper, shallots, curry leaves, cold-pressed coconut oil, coconut milk tang',
        dishes: [
          {
            name: 'Thalassery Mutton Dum Biryani',
            regionalOrigin: 'Malabar Coast (Kannur/Thalassery)',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Spice Trade Icon',
            description: 'Made with short, fragrant Jeerakasala (Khaima) rice rather than basmati, layered with spiced mutton braised in fried onions, green chilies, and coconut ghee, sealed with a banana leaf inside an earthen pot.',
            ingredients: ['Jeerakasala Rice', 'Malabar Mutton', 'Green Chilies', 'Fennel Seed Powder', 'Pure Coconut Ghee'],
            culturalAnecdote: 'Unlike northern biryanis, Malabar biryani uses zero chili powder; all heat comes from fresh green chilies and cracked black pepper.'
          },
          {
            name: 'Malabar Tharavu (Duck) Roast',
            regionalOrigin: 'Kuttanad Wetlands',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Backwater Classic',
            description: 'Succulent country duck slow-cooked with crushed garlic, shallots, coriander, and freshly roasted black peppercorns, roasted until the gravy clings thickly to the meat.',
            ingredients: ['Free-range Kuttanad Duck', 'Whole Peppercorns', 'Curry Leaves', 'Shallots', 'Coconut Milk'],
            culturalAnecdote: 'Kuttanad farmers traditionally bred ducks in the flooded paddy fields after the harvest, producing meat naturally enriched by wild water snails and rice grains.'
          }
        ]
      },
      1765: {
        eraTitle: 'European Spice Treaties & Syrian Christian Meen Moilee',
        eraStory: 'As Dutch and British trading companies fought for control of the Malabar coast, European culinary influences merged with local Christian traditions. In Kottayam and Fort Kochi, Portuguese and British officials struggled with fiery coastal curries, prompting local Syrian Christian cooks to create "Meen Moilee"—a milder, velvety fish stew enriched with fresh coconut milk and turmeric.',
        cookingMethod: 'Earthen Meen Chatti (clay pot) simmer over woodfire',
        signatureDish: 'Fort Kochi Meen Moilee with Idiyappam',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Sweet coconut cream, fresh ginger juliennes, green chili slit, earthy turmeric',
        dishes: [
          {
            name: 'Fort Kochi Meen Moilee',
            regionalOrigin: 'Fort Kochi & Kottayam',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Colonial Fusion',
            description: 'Fresh pearl spot or seer fish gently poached in light coconut milk infused with ginger, green chilies, and turmeric, finished with thick first-press coconut cream and curry leaves.',
            ingredients: ['Fresh Seer Fish', 'First-Press Coconut Milk', 'Fresh Ginger', 'Turmeric', 'Coconut Oil'],
            culturalAnecdote: 'Legend attributes the dish to a Portuguese woman named Moilee who operated a kitchen in Fort Kochi catering to European sailors who wept from local black pepper heat.'
          },
          {
            name: 'Syrian Christian Beef Ularthiyathu',
            regionalOrigin: 'Central Travancore',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Heritage Roast',
            description: 'Tender beef cubes pressure-cooked with spices, then slow-roasted in an iron pan with browned coconut slivers (thenga kothu), shallots, and crushed curry leaves until jet-black.',
            ingredients: ['Diced Beef', 'Roasted Coconut Slivers', 'Curry Leaves', 'Shallots', 'Garam Masala'],
            culturalAnecdote: 'The toasted crunchy coconut slices are the prized treasure of this dish, providing texture against the caramelized meat.'
          }
        ]
      },
      1857: {
        eraTitle: 'Victorian Tea Plantations & Temple Sadya Architecture',
        eraStory: 'In the mid-19th century, British botanical explorers established commercial tea and spice plantations across the Munnar hills. Down in the plains, the royal courts of Travancore formalized the strict 28-dish architecture of the Onam Sadya—a magnificent vegetarian feast served on a tapering banana leaf that honors Kerala\'s seasonal biodiversity.',
        cookingMethod: 'Open-air temple woodfire cooking in massive bronze Varpus',
        signatureDish: 'Traditional Royal Onam Sadya on Plantain Leaf',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Sour curd, earthy coconut paste, roasted cumin, sweet jaggery, bitter snake gourd',
        dishes: [
          {
            name: 'Travancore Palace Avial',
            regionalOrigin: 'Thiruvananthapuram',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Sadya Crown Jewel',
            description: 'A harmonious medley of 13 indigenous vegetables (yam, plantain, drumstick, snake gourd) tossed in a raw coconut, cumin, and green chili paste, finished with sour curd and a raw drizzle of virgin coconut oil.',
            ingredients: ['Ash Gourd', 'Elephant Foot Yam', 'Drumstick', 'Raw Grated Coconut', 'Curd', 'Virgin Coconut Oil'],
            culturalAnecdote: 'Mythology credits the Pandava prince Bhima with inventing Avial when tasked with feeding visitors in King Virata’s court using mismatched vegetable trimmings.'
          },
          {
            name: 'Palada Pradhaman',
            regionalOrigin: 'Ambalappuzha',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Temple Sweet',
            description: 'A rich, creamy dessert made by simmering handcrafted rice flakes (ada) in whole milk and sugar for several hours until it turns a deep pinkish caramel hue.',
            ingredients: ['Handmade Rice Ada', 'Full Fat Cow Milk', 'Sugar', 'Cardamom Powder'],
            culturalAnecdote: 'The Ambalappuzha Sri Krishna Temple is world-famous for its sweet milk pradhaman, offered daily as sacred temple prasadam.'
          }
        ]
      },
      1911: {
        eraTitle: 'Coastal Backwater Staples & Tapioca Revolution',
        eraStory: 'During the reign of Maharaja Visakham Thirunal of Travancore, cassava (tapioca/kappa) was aggressively promoted to protect Kerala against famines. Low in cost and high in starch, kappa was boiled with turmeric and mashed with coconut, paired with fiery red fish curries prepared in earthen pots with sour dried garcinia (kudampuli).',
        cookingMethod: 'Earthen clay pot boiling & stone grinding',
        signatureDish: 'Kuttanad Kappa & Meen Curry',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Smoky sour Kudampuli, fiery red chili paste, tempered mustard seeds, sweet cassava',
        dishes: [
          {
            name: 'Kottayam Fish Curry with Kudampuli',
            regionalOrigin: 'Kottayam & Alappuzha',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Coastal Soul Food',
            description: 'Fish fillets simmered in an intense red gravy made of shallots, ginger, garlic, and sun-dried smoked kudampuli (pot tamarind) in a traditional unglazed clay pot.',
            ingredients: ['King Fish (Surmai)', 'Kudampuli (Fish Tamarind)', 'Kashmiri Chili Powder', 'Fenugreek Seeds', 'Coconut Oil'],
            culturalAnecdote: 'Kudampuli curries taste far superior the next day as the clay pot breathes and the smoked tamarind juices penetrate deeply into the fish flesh.'
          },
          {
            name: 'Kappa Vevichathu (Mashed Tapioca)',
            regionalOrigin: 'Central Kerala',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Working Class Staple',
            description: 'Cassava roots boiled with turmeric, then coarsely mashed and tempered with a paste of coconut, shallots, garlic, and green chilies.',
            ingredients: ['Fresh Tapioca Root', 'Turmeric', 'Crated Coconut Paste', 'Mustard Seeds', 'Curry Leaves'],
            culturalAnecdote: 'Maharaja Visakham Thirunal personally consumed tapioca in public to convince skeptical citizens that the foreign South American root was safe and delicious.'
          }
        ]
      },
      1947: {
        eraTitle: 'Post-Independence Coastal Revival & Toddy Shop Culture',
        eraStory: 'In the decades following Independence, Kerala\'s unique "Toddy Shop" (Shaap) culinary circuit became celebrated for serving some of the state\'s most intense, unapologetically spicy and flavorful preparations. Fermented palm toddy was enjoyed alongside spicy crabs, pearl spot wrapped in charred banana leaves, and fiery clam roasts.',
        cookingMethod: 'Banana leaf wrapping over iron skillet with smoking embers',
        signatureDish: 'Karimeen Pollichathu (Pearl Spot in Banana Leaf)',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Caramelized onion masala, smoked charred banana leaf aroma, sweet flakey fish',
        dishes: [
          {
            name: 'Kumarakom Karimeen Pollichathu',
            regionalOrigin: 'Kumarakom Backwaters',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Culinary Masterpiece',
            description: 'Whole indigenous pearl spot fish slathered with a thick masala of shallots, tomatoes, ginger, and curry leaves, wrapped securely in a wilted banana leaf, and pan-fried on a griddle in coconut oil.',
            ingredients: ['Live Pearl Spot (Karimeen)', 'Shallot-Tomato Chutney', 'Banana Leaf', 'Coconut Oil', 'Curry Leaves'],
            culturalAnecdote: 'The banana leaf acts as a natural pressure cooker; when unwrapped at the table, a cloud of fragrant, charred herbal steam rushes out.'
          },
          {
            name: 'Kakkanadan Kakka Irachi (Clam Roast)',
            regionalOrigin: 'Vembanad Lake',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Backwater Specialty',
            description: 'Tiny fresh water clams tossed in an iron skillet with cracked black pepper, garlic, slivered shallots, and fried coconut pieces until dry and deeply spiced.',
            ingredients: ['Fresh Clam Meat', 'Black Pepper', 'Shallots', 'Coconut Bits', 'Curry Leaves'],
            culturalAnecdote: 'Gathered by women wading into the shallow shores of Vembanad lake using woven cane baskets.'
          }
        ]
      },
      1980: {
        eraTitle: 'The Malabar Parotta Craze & Gulf Diaspora Remittance Kitchens',
        eraStory: 'During the 1980s oil boom, hundreds of thousands of Malayalis migrated to the Persian Gulf. Remittances transformed Kerala\'s economic landscape, and roadside "Thattukadas" (night food carts) sprang up across every highway corner, serving the flaky, layered Malabar Parotta paired with rich, spicy beef fry or chicken kurma.',
        cookingMethod: 'Rhythmic table slapping of maida dough & high-heat griddle searing',
        signatureDish: 'Flaky Malabar Parotta with Kerala Beef Fry',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Crisp buttery layers, caramelized beef crust, coconut bits, toasted fennel aroma',
        dishes: [
          {
            name: 'Malabar Porotta & Beef Fry',
            regionalOrigin: 'Calicut & Kochi',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Street Food Religion',
            description: 'Paper-thin stretched dough coiled into spirals and beaten by hand into flaky layers, served piping hot with deeply caramelized, pepper-crusted beef cubes.',
            ingredients: ['Maida Dough', 'Desi Ghee / Dalda', 'Boneless Beef', 'Shallots', 'Crushed Black Pepper'],
            culturalAnecdote: 'The sound of the Thattukada chef\'s iron spatula clattering rhythmically against the smoking griddle is recognized by every night traveler across Kerala.'
          },
          {
            name: 'Erachi Pathiri',
            regionalOrigin: 'Malappuram',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Mappila Delicacy',
            description: 'Steamed and shallow-fried rice flour parcels stuffed with spiced minced meat and onions, soaked in coconut milk before serving.',
            ingredients: ['Fine Roasted Rice Flour', 'Minced Meat Masala', 'Coconut Milk Dip', 'Fennel Powder'],
            culturalAnecdote: 'A celebratory staple made during Eid and Mappila weddings to honor visiting sons-in-law (puthiyapilla).'
          }
        ]
      },
      2020: {
        eraTitle: 'Hyper-Local Foraging & Pokkali Saline Rice Revival',
        eraStory: 'Modern Kerala culinary culture is championing its ancient agro-biodiversity. The spotlight has returned to Pokkali—an ancient flood- and salt-tolerant red rice cultivated harmoniously with organic prawn filtration in the coastal wetlands of Ernakulam and Thrissur—alongside wild foraging of seasonal leafy greens (Pathila) and single-estate artisan spices.',
        cookingMethod: 'Clay pot slow poaching & progressive botanical fermentation',
        signatureDish: 'Heritage Pokkali Rice Bowl with Chemmeen Manga Curry',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Nutty red bran, sour raw green mango, sweet ocean prawns, creamy coconut emulsion',
        dishes: [
          {
            name: 'Pokkali Red Rice with Chemmeen Manga Curry',
            regionalOrigin: 'Ernakulam Coast',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Ancient Biodiversity',
            description: 'Nutritious unpolished Pokkali red rice paired with sweet sea prawns simmered with firm raw country mangoes, coconut milk, and fresh curry leaves.',
            ingredients: ['GI-Tagged Pokkali Rice', 'Tiger Prawns', 'Raw Country Green Mango', 'Coconut Milk', 'Mustard Seeds'],
            culturalAnecdote: 'Pokkali farming is completely organic: half the year rice grows in monsoon freshwater; the other half, the field floods with sea water and prawns clean the soil naturally.'
          },
          {
            name: 'Pathila Thoran (Monsoon Wild Green Stir Fry)',
            regionalOrigin: 'Palakkad & Wayanad',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Foraged Ayurveda',
            description: 'A traditional Karkidakam (monsoon) medicinal stir-fry made of ten wild, foraged backyard leaves tossed with fresh grated coconut, shallots, and green chilies.',
            ingredients: ['Colocasia Leaves', 'Senna Leaves', 'Wild Amaranth', 'Grated Coconut', 'Coconut Oil'],
            culturalAnecdote: 'Eaten strictly during the monsoon month of Karkidakam to rejuvenate immunity when external dampness weakens digestive fire (agni).'
          }
        ]
      }
    }
  );

  // 3. RAJASTHAN
  data['rajasthan'] = makeState(
    'rajasthan',
    'Rajasthan',
    'West',
    'Desert Fortresses, Shikar Feasts & The Marwari Hearth',
    'In a land sculpted by the Thar Desert, scorching winds, and heroic fortresses, Rajasthan turned geographic scarcity into culinary genius. Devoid of abundant fresh water and greens, the cuisine championed sun-dried desert berries, wild beans, slow-churned desi ghee, and fiery Mathania red chilies.',
    ['Mathania Dry Red Chilies', 'Ker (Desert Capers)', 'Sangri (Prosopis Pods)', 'Kachri (Wild Cucumber Tenderizer)', 'Bajra (Pearl Millet)', 'Pure Desi Cow Ghee', 'Hing'],
    {
      1700: {
        eraTitle: 'Warrior Rations & Ker Sangri Desert Preservation',
        eraStory: 'During prolonged military campaigns and sieges of Rajput hill forts like Chittorgarh and Mehrangarh, warriors could not rely on perishable vegetables or fresh water. Cooks developed Ker Sangri—foraged wild desert capers and dried pods of the Khejri tree boiled and preserved in pure mustard oil and dry spices that lasted for months on horseback.',
        cookingMethod: 'Sun-drying, stone-jar pickling, and cow dung charcoal simmer',
        signatureDish: 'Traditional Ker Sangri with Bajra Roti',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Pungent mustard oil, sour ker berry, earthy sangri, nutty pearl millet, whole amchur',
        dishes: [
          {
            name: 'Traditional Royal Ker Sangri',
            regionalOrigin: 'Thar Desert (Jodhpur/Bikaner)',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Desert Survival Masterpiece',
            description: 'Sun-dried desert beans (sangri) and wild caper berries (ker) soaked overnight, sauteed in mustard oil with dry mango powder, red chilies, raisins, and roasted spices.',
            ingredients: ['Desert Sangri Pods', 'Wild Ker Berries', 'Amchur', 'Mathania Chili Flakes', 'Mustard Oil'],
            culturalAnecdote: 'The Khejri tree is considered sacred by the Bishnoi community; its protein-rich pods sustained desert civilizations through catastrophic historic droughts.'
          },
          {
            name: 'Bajra Raab & Khichdi',
            regionalOrigin: 'Shekhawati',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Ancestral Hearth',
            description: 'Coarsely pounded pearl millet simmered with yellow moong dal, served steaming hot with a generous well of melted yellow cow ghee and jaggery.',
            ingredients: ['Pearl Millet (Bajra)', 'Moong Dal', 'Pure Desi Ghee', 'Raw Cane Jaggery'],
            culturalAnecdote: 'In biting winter desert nights, bajra khichdi is eaten with hot ghee to maintain internal body warmth.'
          }
        ]
      },
      1765: {
        eraTitle: 'Rajput Royal Shikar (Hunting) Banquets & Jungli Maas',
        eraStory: 'When Rajput Maharajas ventured on royal hunting expeditions (shikar) in the Aravalli hills, royal khansamas carried only basic survival rations: salt, clarified ghee, and dried red chilies. Freshly hunted wild boar or deer was cooked in an open pot over campfire coals with nothing more than these three ingredients, birthing the legendary "Jungli Maas".',
        cookingMethod: 'Open campfire pit cooking in copper Handi with pure ghee',
        signatureDish: 'Shikar Jungli Maas',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Pure desi ghee richness, fiery whole red chili heat, tender game meat, sea salt',
        dishes: [
          {
            name: 'Authentic Campfire Jungli Maas',
            regionalOrigin: 'Mewar & Jaipur Shikar Camps',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Royal Hunter Dish',
            description: 'Tender meat braised slowly in a massive pool of desi cow ghee with only whole dry Mathania red chilies and rock salt, without onion, garlic, or water.',
            ingredients: ['Wild Game or Mutton', 'Pure Desi Ghee', 'Whole Dry Mathania Chilies', 'Rock Salt'],
            culturalAnecdote: 'Cooked strictly in ghee without a drop of water, this preparation could remain fresh for days under the desert sun without spoiling.'
          },
          {
            name: 'Gatte ki Kadhi',
            regionalOrigin: 'Marwar',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Arid Kitchen Heritage',
            description: 'Poached gram flour dumplings spiced with ajwain and kasoori methi, simmered in a tangy yogurt and besan gravy tempered with mustard seeds and curry leaves.',
            ingredients: ['Bengal Gram Flour (Besan)', 'Sour Curd', 'Ajwain (Carom)', 'Dry Fenugreek Leaves', 'Ghee Tadka'],
            culturalAnecdote: 'When fresh vegetables were unavailable in summer droughts, gram flour took center stage as a versatile vegetable substitute.'
          }
        ]
      },
      1857: {
        eraTitle: 'The Marwari Trading Diaspora & Dal Baati Churma',
        eraStory: 'As the Marwari merchant community expanded its trading houses from Rajasthan to Calcutta, Bombay, and Rangoon, the humble, wholesome Dal Baati Churma became the ultimate symbol of home. Hard-baked wheat baatis were cracked open and drowned in bowls of golden cow ghee, served alongside spiced five-lentil dal and sweet crushed churma.',
        cookingMethod: 'Baking over dried cow dung cake (kanda) coals',
        signatureDish: 'Royal Dal Baati Churma with Garlic Chutney',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Nutty roasted whole wheat, smoky ghee aroma, spicy panchmel dal, cardamom sweet churma',
        dishes: [
          {
            name: 'Panchmel Dal Baati Churma',
            regionalOrigin: 'Mewar (Udaipur)',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Signature Thali Heritage',
            description: 'Dough balls of coarse wheat flour baked on slow coals until the crust crackles, soaked in hot desi ghee, served with a stew of five lentils and sweet churma pounded with dry fruits.',
            ingredients: ['Coarse Wheat Flour', 'Panchmel Lentils', 'Yellow Cow Ghee', 'Raw Boora Sugar', 'Green Cardamom'],
            culturalAnecdote: 'Raw baati dough balls were originally buried under desert sand by soldiers in the morning; by afternoon, the desert sun had baked them to perfection.'
          },
          {
            name: 'Lehsun ki Chutney (Fiery Garlic Chutney)',
            regionalOrigin: 'Jodhpur',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Piquant Accompaniment',
            description: 'Peeled garlic cloves and soaked Mathania dry chilies pounded together on a sil-batta (grindstone) and cooked in hot ghee until the oil separates.',
            ingredients: ['Fresh Garlic Cloves', 'Soaked Red Chilies', 'Cumin Seeds', 'Mustard Oil / Ghee', 'Lemon Juice'],
            culturalAnecdote: 'Said to ward off desert heatstroke and stimulate sluggish digestion caused by heavy ghee-based feasts.'
          }
        ]
      },
      1911: {
        eraTitle: 'Princely Courts & The Dhungar Smoked Laal Maas',
        eraStory: 'In the grand royal palaces of Jaipur, Jodhpur, and Bikaner, Rajput maharajas hosted extravagant state banquets. The royal kitchens refined Laal Maas into an art form, utilizing the "Dhungar" technique—placing a smoking red-hot charcoal clove into a small bowl atop the meat, pouring hot ghee over it, and instantly clamping the lid shut to perfume the gravy.',
        cookingMethod: 'Dhungar (smoking with charcoal and clove) in brass handis',
        signatureDish: 'Rajputana Royal Laal Maas',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Deep scarlet Mathania chili, clove smoke, wild kachri sourness, rich mutton fat',
        dishes: [
          {
            name: 'Royal Mathania Laal Maas',
            regionalOrigin: 'Jaipur & Mehrangarh',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Princely Masterpiece',
            description: 'Tender mutton pieces braised in a velvety crimson gravy of soaked Mathania chili paste, yogurt, and wild kachri, finished with a smoking charcoal dhungar infusion.',
            ingredients: ['Young Goat Meat', 'Soaked Mathania Chilies', 'Curd', 'Kachri Powder', 'Clove Smoked Charcoal'],
            culturalAnecdote: 'Mathania chilies from the village of Mathania are famed for their brilliant ruby color without excessive tongue-numbing bitterness.'
          },
          {
            name: 'Safed Maas (Almond White Curry)',
            regionalOrigin: 'Mewar Palace',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Royal Contrast',
            description: 'The royal counterpoint to Laal Maas: tender meat cooked in a snowy white sauce of boiled onion paste, almonds, cashew nuts, and fresh cream spiced with white pepper.',
            ingredients: ['Tender Lamb', 'Almond Paste', 'Khoya', 'Cardamom', 'White Pepper'],
            culturalAnecdote: 'Served at summer palace banquets to provide visual and sensory respite from fiery red dishes.'
          }
        ]
      },
      1947: {
        eraTitle: 'Post-Integration Royal Halwais & Pyaaz Kachori Boom',
        eraStory: 'When 22 princely states merged into modern Rajasthan in 1949, royal court confectioners opened street shops in the lanes of Jodhpur, Jaipur, and Bikaner. Legendary street sweets and savories—such as the gigantic, flaky Jodhpuri Pyaaz Kachori and the honeycomb disc Ghevar—spread to everyday citizens.',
        cookingMethod: 'Deep frying in slow-heat kadhais & sugar syrup soaking',
        signatureDish: 'Jodhpuri Pyaaz Kachori with Meethi Chutney',
        signatureImage: '/assets/bedmi_kachori.jpg',
        signatureFlavor: 'Crisp flaky crust, spicy onion-potato filling, roasted fennel seeds, coriander crunch',
        dishes: [
          {
            name: 'Rawat ki Pyaaz Kachori',
            regionalOrigin: 'Jodhpur & Jaipur',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Legendary Street Snack',
            description: 'Flaky pastry shells filled with a savory mixture of finely chopped onions, boiled potatoes, crushed coriander seeds, fennel, and garam masala, fried slowly until golden brown.',
            ingredients: ['Maida Dough', 'Caramelized Onions', 'Fennel Seeds', 'Coriander Seeds', 'Asafoetida', 'Ghee'],
            culturalAnecdote: 'True Jodhpuri kachoris must be fried for at least 30 minutes over low heat to achieve their characteristic paper-thin concentric pastry layers.'
          },
          {
            name: 'Paneer Ghevar with Rabdi',
            regionalOrigin: 'Jaipur',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Festive Confection',
            description: 'A porous, disc-shaped sweet made from an emulsion of flour and ghee dropped into boiling ghee, soaked in saffron sugar syrup and topped with condensed milk rabdi.',
            ingredients: ['Flour Batter', 'Clarified Ghee', 'Saffron Syrup', 'Thick Rabdi', 'Silver Varq'],
            culturalAnecdote: 'Traditionally prepared during the Teej and Raksha Bandhan festivals in monsoon when atmospheric humidity allows the honeycomb structure to form.'
          }
        ]
      },
      1980: {
        eraTitle: 'Marwari Bhojanalayas & The Bikaneri Bhujia Cottage Boom',
        eraStory: 'The 1980s witnessed the pan-Indian expansion of pure-vegetarian Marwari Bhojanalayas, which introduced authentic Rajasthani vegetarian home dining to every major city from Ahmedabad to Chennai. In Bikaner, cottage industry artisans mechanized the production of moth-bean-flour Bhujia, transforming the desert snack into a national staple.',
        cookingMethod: 'Brass pressing into boiling peanut oil & iron griddle rotis',
        signatureDish: 'Bikaneri Moth Dal Bhujia & Govind Gatta Curry',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Moth bean crunch, black pepper kick, hing aroma, rich curd gravy',
        dishes: [
          {
            name: 'Govind Gatta Curry (Stuffed Gram Flour Dumplings)',
            regionalOrigin: 'Jaipur',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Vegetarian Aristocracy',
            description: 'Silky gram flour rolls stuffed with a luxurious filling of mawa (khoya), chopped cashews, raisins, and mint, cooked in a royal saffron-scented yogurt gravy.',
            ingredients: ['Gram Flour (Besan)', 'Mawa (Khoya)', 'Cashew Nuts', 'Yogurt Gravy', 'Saffron'],
            culturalAnecdote: 'Created by royal cooks to impress visiting dignitaries who adhered to strict satvik vegetarian diets.'
          },
          {
            name: 'Papad ki Sabzi with Methi Dana',
            regionalOrigin: 'Bikaner',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Homestyle Heritage',
            description: 'Roasted urad dal papad pieces broken and quickly simmered in a spiced buttermilk broth with sprouted fenugreek seeds and dry red chilies.',
            ingredients: ['Urad Dal Papad', 'Sour Buttermilk', 'Fenugreek Seeds', 'Turmeric', 'Cumin'],
            culturalAnecdote: 'The ultimate emergency dish in a Marwari household—can be prepared from pantry staples in under ten minutes.'
          }
        ]
      },
      2020: {
        eraTitle: 'Desert Superfoods, Camel Dairy & Millets Renaissance',
        eraStory: 'Modern Rajasthan has become the vanguard of India\'s ancient grain revival. Indigenous pearl millet (Bajra), sorghum (Jowar), and moth beans are recognized worldwide as climate-resilient superfoods. In Bikaner and Pushkar, camel milk cheese and organic cold-pressed mustard oil are celebrated in contemporary farm-to-table dining.',
        cookingMethod: 'Slow earthen baking and modern cold-press extractions',
        signatureDish: 'Artisanal Bajra Tart with Ker Sangri Mousse',
        signatureImage: '/assets/dal_baati_churma.jpg',
        signatureFlavor: 'Toasted millet nuttiness, savory desert caper mousse, saffron drizzle',
        dishes: [
          {
            name: 'Heirloom Bajra Baati with Churna Crumble',
            regionalOrigin: 'Western Thar',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Superfood Revival',
            description: 'Baatis crafted from organic single-origin Bajra, baked slowly and dipped in A2 Gir cow ghee, served with organic yellow dal and wild berry relish.',
            ingredients: ['Heirloom Bajra', 'A2 Desi Cow Ghee', 'Organic Dal', 'Ker Sangri Relish'],
            culturalAnecdote: 'Pearl millet uses 70% less water than rice or wheat, making it the agricultural savior of Rajasthan in the era of climate adaptation.'
          },
          {
            name: 'Artisanal Camel Milk Kheer',
            regionalOrigin: 'Bikaner Research Belt',
            image: '/assets/dal_baati_churma.jpg',
            tag: 'Pastoral Innovation',
            description: 'Slightly salty, nutrient-dense camel milk slow-cooked with basmati rice, dates, and pistachios, offering a distinctive mineral depth.',
            ingredients: ['Fresh Camel Milk', 'Rice', 'Medjool Dates', 'Saffron', 'Pistachios'],
            culturalAnecdote: 'The Raika pastoralist community has herded camels in Rajasthan for centuries, traditionally drinking raw camel milk for endurance across sand dunes.'
          }
        ]
      }
    }
  );

  // 4. ASSAM
  data['assam'] = makeState(
    'assam',
    'Assam',
    'Northeast',
    'The Brahmaputra Valley, Fermented Khar & Wild Tea Gardens',
    'Flowing through the mist of the Brahmaputra valley, Assamese cuisine is an ode to nature\'s raw, untouched botanical bounty. Characterized by little to no frying, it relies on alkaline banana ash extracts (Khar), tangy sour fruit curries (Tenga), fermented bamboo shoots (Khorisa), and wild aromatic herbs.',
    ['Ou Tenga (Elephant Apple)', 'Kaji Nemu (Assam Lemon)', 'Bhoot Jolokia (Ghost Pepper)', 'Khar (Banana Ash Alkaline Extract)', 'Khorisa (Fermented Bamboo Shoot)', 'Joha Fragrant Rice', 'Dhekia Xak (Fiddlehead Ferns)'],
    {
      1700: {
        eraTitle: 'The Ahom Dynasty Royal Feasts & Ancient Khar Science',
        eraStory: 'Under the six-century reign of the mighty Ahom kingdom that resisted Mughal expansion, Assamese cuisine developed its unique scientific philosophy. Feasts began with "Khar"—a natural alkaline extract filtered through the burned ashes of sun-dried banana peels—believed to cleanse the digestive tract before consuming river carp and wild game.',
        cookingMethod: 'Steaming in fresh green bamboo tubes (Chunga) over wood embers',
        signatureDish: 'Ahom Royal Masor Tenga with Ou Tenga',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Tart elephant apple sourness, sweet river carp, mustard seed tempering, pungent mustard oil',
        dishes: [
          {
            name: 'Ahom Masor Tenga with Ou Tenga',
            regionalOrigin: 'Brahmaputra Valley (Sivasagar)',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Ancient Royal Soups',
            description: 'Fresh river carp cooked in a light, refreshing sour broth made with slices of wild elephant apple (ou tenga), tempered with fenugreek and mustard seeds in pure mustard oil.',
            ingredients: ['Fresh Rohu Carp', 'Ou Tenga (Elephant Apple)', 'Mustard Oil', 'Fenugreek Seeds', 'Green Chilies'],
            culturalAnecdote: 'The Ahom kings believed that starting a meal with alkaline Khar and ending with acidic Tenga maintained perfect bodily harmony.'
          },
          {
            name: 'Chunga Saul (Bamboo Tube Steamed Rice)',
            regionalOrigin: 'Upper Assam',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Forest Culinary Ingenuity',
            description: 'Fragrant Joha or Bora sticky rice soaked in water, stuffed inside green hollow bamboo tubes with banana leaf stoppers, and roasted slowly over wood embers.',
            ingredients: ['Bora Sticky Rice', 'Hollow Green Bamboo', 'Banana Leaf Plug', 'Spring Water'],
            culturalAnecdote: 'The natural inner membrane of the fresh bamboo tube peels away with the cooked rice, imparting a delicate woody, sweet aroma.'
          }
        ]
      },
      1765: {
        eraTitle: 'Riverine Foraging & The Alkaline Khar Traditions',
        eraStory: 'During the late 18th century, Assamese domestic food rituals centered on seasonal wild foraging along the Brahmaputra sandbars (chars). Homemakers gathered seasonal fiddlehead ferns (Dhekia Xak) and bottle gourds, cooking them with raw alkaline khar and small river fish with minimal spices to preserve medicinal properties.',
        cookingMethod: 'Boiling and gentle water simmering without oil or heavy spices',
        signatureDish: 'Amita Diya Khar (Raw Papaya with Alkaline Banana Ash)',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Silky alkaline smoothness, subtle sweetness of raw papaya, pungent mustard kick',
        dishes: [
          {
            name: 'Omita Diya Khar',
            regionalOrigin: 'Kamrup & Nagaon',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Alkaline Starter',
            description: 'Finely chopped raw papaya cooked with the filtered ash water of sun-dried Bhimkol banana skins, tempered with whole black mustard seeds and green chilies.',
            ingredients: ['Raw Green Papaya', 'Filtered Kolakhar (Banana Ash Water)', 'Mustard Oil', 'Panch Phoron', 'Salt'],
            culturalAnecdote: 'An authentic traditional Assamese meal is never complete without Khar served as the very first course with hot steamed rice.'
          },
          {
            name: 'Dhekia Xak Bhaja with Small River Fish',
            regionalOrigin: 'Majuli Island',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Wild Riverine Bounty',
            description: 'Tender fiddlehead ferns foraged from riverbanks, lightly sautéed in mustard oil with tiny freshwater fish, turmeric, and slit green chilies.',
            ingredients: ['Fiddlehead Ferns (Dhekia)', 'Fresh Catch Small Fish', 'Cold-Pressed Mustard Oil', 'Turmeric'],
            culturalAnecdote: 'Majuli islanders can identify dozens of wild edible ferns, each gathered during specific weeks of the pre-monsoon season.'
          }
        ]
      },
      1857: {
        eraTitle: 'Colonial Tea Gardens & Duck with Kumura (Ash Gourd)',
        eraStory: 'In the mid-19th century, British botanist Robert Bruce discovered native Camellia sinensis var. assamica tea plants growing wild in Upper Assam. The establishment of sprawling tea estates transformed Assam\'s landscape. In planter bungalows and local hearths, winter duck curries cooked with whole ash gourd (Kumura) became the crowning feast of harvest celebrations.',
        cookingMethod: 'Slow brass pot braising over tamarind and bamboo coals',
        signatureDish: 'Hahor Mangxo Kumura Diya (Duck with Ash Gourd)',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Rich duck fat, tender melt-in-mouth winter ash gourd, black pepper, ginger-garlic paste',
        dishes: [
          {
            name: 'Hahor Mangxo Kumura Diya',
            regionalOrigin: 'Jorhat & Sivasagar',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Harvest Celebration Feast',
            description: 'Country duck braised with large chunks of sweet winter ash gourd, whole black peppercorns, crushed ginger, and whole spices until the gourd absorbs all the savory duck juices.',
            ingredients: ['Free-range Assamese Duck', 'Ripe Ash Gourd (Kumura)', 'Black Peppercorns', 'Mustard Oil', 'Coriander Root'],
            culturalAnecdote: 'Traditionally prepared on Uka (the eve of Magh Bihu) after farmers reap the golden winter paddy harvest.'
          },
          {
            name: 'Orthodox Assam CTC Tea with Steamed Pitha',
            regionalOrigin: 'Dibrugarh Tea Estates',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Colonial Plantation Heritage',
            description: 'Strong, malty black Assam tea brewed from fresh estate leaves, paired with crisp rice pithas stuffed with grated coconut and toasted black sesame seeds.',
            ingredients: ['Assam Black Tea Leaves', 'Sticky Rice Flour', 'Black Sesame (Til)', 'Liquid Date Palm Jaggery'],
            culturalAnecdote: 'Upper Assam\'s alluvial Brahmaputra soil and heavy tropical monsoon rains give Assam tea its world-renowned rich, malty liquor.'
          }
        ]
      },
      1911: {
        eraTitle: 'Bihu Seasonal Harvests & The Magic of Joha Sticky Rice',
        eraStory: 'During the early 20th century, seasonal Bihu festivals cemented the sacred cultural rituals around rice. Joha rice—an indigenous small-grained aromatic cultivar—filled village homes with a delicate floral scent reminiscent of jasmine, while Bora rice was transformed into endless varieties of Pitha and seasonal snacks.',
        cookingMethod: 'Earthen pan roasting, steaming in banana leaves, and stone grinding',
        signatureDish: 'Til Pitha & Ghila Pitha with Fragrant Joha Rice',
        signatureImage: '/assets/bedmi_kachori.jpg',
        signatureFlavor: 'Toasted black sesame, warm jaggery syrup, crisp rice wafer, floral aroma',
        dishes: [
          {
            name: 'Traditional Assamese Til Pitha',
            regionalOrigin: 'Majuli & Golaghat',
            image: '/assets/bedmi_kachori.jpg',
            tag: 'Bihu Sacred Sweet',
            description: 'Glutinous Bora rice flour spread thinly over an iron griddle, filled with roasted black sesame seeds sweetened with melted jaggery, and skillfully rolled into cylindrical batons.',
            ingredients: ['Bora Saul (Sticky Rice)', 'Black Sesame Seeds', 'Cane Jaggery', 'Iron Tawa'],
            culturalAnecdote: 'Rolling a til pitha requires quick, delicate finger work on a scalding griddle without letting the fragile rice crust crack.'
          },
          {
            name: 'Joha Saul Kheer with Bay Leaves',
            regionalOrigin: 'Barpeta',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Festive Pudding',
            description: 'Fragrant heirloom Joha rice simmered slowly in creamy cow milk with bay leaves, green cardamom, and golden jaggery.',
            ingredients: ['Aromatic Joha Rice', 'Full Cream Milk', 'Assamese Bay Leaf (Tejpatta)', 'Cardamom'],
            culturalAnecdote: 'The intoxicating fragrance of Joha rice is so potent that villagers say you can tell which home is cooking lunch from across the paddy fields.'
          }
        ]
      },
      1947: {
        eraTitle: 'Tribal Exchanges & Pork with Fermented Bamboo Shoot',
        eraStory: 'Post-Independence brought deeper culinary exchanges between the plains of Assam and the surrounding hill tribes. Pork cooked with "Khorisa" (fermented grated bamboo shoot) emerged as one of Assam\'s most iconic, soul-satisfying preparations, bringing together the sour funk of bamboo shoots with the unctuous richness of pork belly.',
        cookingMethod: 'Slow wok braising in its own fat with fermented bamboo shoots',
        signatureDish: 'Gahori Khorisa (Pork with Fermented Bamboo Shoot)',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Pungent fermented bamboo shoot funk, succulent pork fat, fresh green chili, ginger',
        dishes: [
          {
            name: 'Gahori Khorisa',
            regionalOrigin: 'Dibrugarh & Dhemaji',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Plains-Tribal Classic',
            description: 'Pork belly cubes cooked with crushed ginger, garlic, and generous ladles of khorisa (bamboo shoots fermented in mustard oil and salt), simmered until tender.',
            ingredients: ['Pork Belly', 'Khorisa (Fermented Bamboo Shoots)', 'Garlic Cloves', 'Green Chilies', 'Mustard Oil'],
            culturalAnecdote: 'Young bamboo shoots are harvested during pre-monsoon, grated finely, and sealed in glass or earthen jars under the sun for months to develop their characteristic sour depth.'
          },
          {
            name: 'Pani Hamuk (Freshwater Snails in Black Dal)',
            regionalOrigin: 'Brahmaputra Marshes',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Indigenous Delicacy',
            description: 'Cleaned river snails cooked with black lentils (mati mah) and wild herbs, eaten by sucking the sweet snail meat straight from the shell.',
            ingredients: ['Freshwater Snails', 'Black Urad Dal', 'Garlic', 'Green Chilies', 'Wild Herbs'],
            culturalAnecdote: 'A beloved tribal delicacy rich in iron and protein, gathered from clean wetlands after the floods recede.'
          }
        ]
      },
      1980: {
        eraTitle: 'The Bhoot Jolokia Cult & Brahmaputra Fish Stalls',
        eraStory: 'During the 1980s, global botanists discovered that Assam\'s indigenous "Bhoot Jolokia" (Ghost Pepper) was officially the hottest chili pepper on planet Earth, clocking over 1,000,000 Scoville Heat Units. In Assam, however, the fiery pepper was never eaten as a macho stunt—it was treated with deep reverence, used sparingly to scent mustard fish curries and raw pickles.',
        cookingMethod: 'Fresh infusion, raw mashing, and mustard oil pickling',
        signatureDish: 'Boror Tenga with Kaji Nemu & Ghost Pepper Slice',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Fruity ghost pepper perfume, refreshing oval lemon aroma, crispy lentil fritters',
        dishes: [
          {
            name: 'Kaji Nemu Diya Masor Tenga',
            regionalOrigin: 'Guwahati & Tezpur',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Citrus Sensation',
            description: 'River fish cooked in a clear, golden broth, taken off the fire and finished with fresh juice and aromatic rind of the elongated GI-tagged Kaji Nemu lemon.',
            ingredients: ['River Carp Fillets', 'Kaji Nemu (Assam Lemon)', 'Mustard Oil', 'Turmeric', 'Green Chili'],
            culturalAnecdote: 'Unlike round lemons, Kaji Nemu is elongated and has a fragrant, seedless skin whose essential oils elevate any simple broth into a culinary triumph.'
          },
          {
            name: 'Bhoot Jolokia Achar (Ghost Pepper Pickle)',
            regionalOrigin: 'Golaghat',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Fiery Legend',
            description: 'Whole ghost peppers sun-cured with bamboo shoots, mustard seeds, and pungent mustard oil in glass jars.',
            ingredients: ['Fresh Bhoot Jolokia', 'Mustard Seeds', 'Khorisa', 'Mustard Oil', 'Salt'],
            culturalAnecdote: 'A single pod is often touched gently to hot rice to release its smoky fragrance without unleashing its incendiary heat.'
          }
        ]
      },
      2020: {
        eraTitle: 'Wild Botanical Foraging & The Slow Food Renaissance',
        eraStory: 'In contemporary times, young Assamese chefs and culinary anthropologists are putting indigenous northeastern ingredients on the international fine dining map. Ancient, unhybridized wild greens (Xak), indigenous freshwater fish, smoked pork, and natural fermentation techniques are celebrated as masterclasses in sustainable gastronomy.',
        cookingMethod: 'Artisanal earthen fermentation, slow wood smoking, and clean reduction',
        signatureDish: 'Smoked River Fish with Foraged Herbs & Joha Porridge',
        signatureImage: '/assets/kerala_sadya.jpg',
        signatureFlavor: 'Woodsmoke, herbal bitterness, floral rice aroma, bright citrus finish',
        dishes: [
          {
            name: 'Smoked Rohu with 108 Wild Herbs (108 Xak)',
            regionalOrigin: 'Kaziranga Buffer Belt',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Botanical Heritage',
            description: 'Wood-smoked freshwater fish cooked with a collection of seasonally foraged wild riverbank herbs, wild mint, and black mustard.',
            ingredients: ['Smoked River Carp', 'Wild Foraged Herbs', 'Ginger', 'Green Chilies', 'Cold-Pressed Mustard Oil'],
            culturalAnecdote: 'During Goru Bihu, tradition dictates gathering 108 distinct wild edible plants to make a restorative soup that resets bodily health for the new year.'
          },
          {
            name: 'Kaji Nemu & Black Rice Halwa',
            regionalOrigin: 'Majuli Artisan Labs',
            image: '/assets/kerala_sadya.jpg',
            tag: 'Contemporary Assamese Dessert',
            description: 'Deep purple aromatic Chak-hao sticky rice slow-cooked with coconut milk, candied Kaji Nemu peel, and crushed cashews.',
            ingredients: ['Chak-hao Black Rice', 'Coconut Milk', 'Candied Kaji Nemu', 'Jaggery'],
            culturalAnecdote: 'Rich in anthocyanin antioxidants, black rice was once reserved for royalty and is now an icon of Northeast agro-tourism.'
          }
        ]
      }
    }
  );

  return data;
};
