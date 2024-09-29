// index.js
export { default as FishCalculator } from './js/fish.js';
// export { default as FlowersCalculator } from './js/flowers.js';
export { default as GolfCalculator } from './js/golf.js';
export { default as RacingCalculator } from './js/racing.js';
export { default as SuitsCalculator } from './js/suits.js';

import FishCalculator from './js/fish.js';

const calc = new FishCalculator();
const best = calc.sortBestRarity();
best.forEach(fish => {
    const perc = (fish.probability * 100).toFixed(2);
    console.log(`${fish.name}: ${perc}%`);
})
