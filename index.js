// index.js
export { default as FishCalculator } from './js/fish.js';
// export { default as FlowersCalculator } from './js/flowers.js';
export { default as GolfCalculator } from './js/golf.js';
export { default as RacingCalculator } from './js/racing.js';
export { default as SuitsCalculator } from './js/suits.js';

import FishCalculator from './js/fish.js';

const toon = `{"rod":{"id":0,"name":"Twig"},"collection":{}}`;
const fishCalc = new FishCalculator(toon);
const fish = fishCalc.sortBestRarity()
fish.forEach(fish => {
    console.log(`${fish.name}: ${fish.buckets} buckets (${(fish.probability*100).toFixed(2)}%) in ${fish.location}\n`);
})