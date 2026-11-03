// Sources from the report's references section, shown at the bottom of each state
export const REPORT_SOURCES = [
  { label: 'Achaya (1994), Indian Food: A Historical Companion', url: 'https://wellcomecollection.org/works/a6y6cmej' },
  { label: 'Antani & Mahapatra (2022), Evolution of Indian cuisine', url: 'https://doi.org/10.1186/s42779-022-00129-4' },
  { label: 'Appadurai (1988), How to make a national cuisine', url: 'https://doi.org/10.1017/S0010417500015024' },
  { label: 'Burdick et al. (2012), Digital_Humanities', url: 'https://mitpress.mit.edu/9780262528863/digital_humanities/' },
  { label: 'Taylor Sen (2015), Feasts and Fasts', url: 'https://reaktionbooks.co.uk/work/feasts-and-fasts' },
  { label: 'UNESCO, Food and intangible heritage', url: 'https://www.unesco.org/en/articles/food-and-intangible-heritage-flavourful-relationship' },
  { label: 'Vermani (2023), Spread of bounties', url: 'https://doi.org/10.1017/S1356186323000354' },
  { label: 'Tarla Dalal', url: 'https://www.tarladalal.com/' },
  { label: "Dassana's Veg Recipes (Karnataka cuisine)", url: 'https://www.vegrecipesofindia.com/recipes/karnataka-cuisine/' },
  { label: "Hebbar's Kitchen", url: 'https://hebbarskitchen.com/' },
  { label: 'Ranveer Brar (YouTube)', url: 'https://www.youtube.com/@RanveerBrar' },
  { label: 'Your Food Lab (YouTube)', url: 'https://www.youtube.com/@YourFoodLab' },
  { label: 'Sanjeev Kapoor Khazana (YouTube)', url: 'https://www.youtube.com/@sanjeevkapoorkhazana' },
  { label: 'Nisha Madhulika (YouTube)', url: 'https://www.youtube.com/@NishaMadhulika' },
  { label: 'Project repository (GitHub)', url: 'https://github.com/ugthinks/Interactive_map' },
];

// Specific recipe pages from the report, shown only for their state
export const STATE_SOURCES = {
  'maharashtra': [{ label: 'Maharashtrian amti dal (Dassana)', url: 'https://www.vegrecipesofindia.com/amti-recipe-maharashtrian-amti-recipe/' }],
  'karnataka': [{ label: 'Karnataka cuisine collection (Dassana)', url: 'https://www.vegrecipesofindia.com/recipes/karnataka-cuisine/' }],
};

const enc = encodeURIComponent;

// Per-dish links: YouTube plus two recipe sites, all as search pages.
// Replace any with a checked recipe by adding recipeUrl to the dish in culinaryData.js.
export function dishRecipeLinks(dish, stateName) {
  if (dish.recipeUrl) return [{ label: 'Recipe (checked)', url: dish.recipeUrl }];
  const name = dish.name.replace(/\(.*?\)/g, '').trim();
  return [
    { label: 'YouTube', url: `https://www.youtube.com/results?search_query=${enc(name + ' recipe')}` },
    { label: "Hebbar's Kitchen", url: `https://hebbarskitchen.com/?s=${enc(name)}` },
    { label: 'Dassana', url: `https://www.vegrecipesofindia.com/?s=${enc(name)}` },
    { label: `${stateName} food on YouTube`, url: `https://www.youtube.com/results?search_query=${enc(stateName + ' traditional food recipes')}` },
  ];
}

const linkHtml = (l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`;

export function renderRecipeLinks(dish, stateName) {
  return `<div class="recipe-links">${dishRecipeLinks(dish, stateName).map(linkHtml).join('')}</div>`;
}

export function renderSourcesFooter(stateId) {
  const specific = STATE_SOURCES[stateId] || [];
  return `
    <div class="sources-footer">
      <strong>Sources</strong>
      <ul>
        ${[...specific, ...REPORT_SOURCES].map(s => `<li>${linkHtml(s)}</li>`).join('')}
      </ul>
    </div>`;
}