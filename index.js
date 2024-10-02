// index.js
export { default as FishCalculator } from './js/fish.js';
// export { default as FlowersCalculator } from './js/flowers.js';
export { default as GolfCalculator } from './js/golf.js';
export { default as RacingCalculator } from './js/racing.js';
export { default as SuitsCalculator } from './js/suits.js';

import FishCalculator from './js/fish.js';
import fs from 'fs';

const rods = ["Twig", "Bamboo", "Hardwood", "Steel", "Gold"];

for (const rod of rods) {
    const toon = `{"rod":{"id":0,"name":"${rod}"},"collection":{}}`;
    const fishCalc = new FishCalculator(toon);
    const fish = fishCalc.sortBestRarity()
    let result = `${rod.toUpperCase()}, ${fish.length} fish\n`;
    fish.forEach(fish => {
        result += `${fish.name}: ${fish.buckets} buckets (${(fish.probability*100).toFixed(2)}%) in ${fish.location}\n`;
    })
    fs.appendFileSync('fish_results.txt', result + '\n', 'utf8');
}