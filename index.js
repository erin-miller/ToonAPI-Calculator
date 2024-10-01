// index.js
export { default as FishCalculator } from './js/fish.js';
// export { default as FlowersCalculator } from './js/flowers.js';
export { default as GolfCalculator } from './js/golf.js';
export { default as RacingCalculator } from './js/racing.js';
export { default as SuitsCalculator } from './js/suits.js';

import RacingCalculator from './js/racing.js';

const toon = '[{"name": "Speedway Wins", "num": 1}, {"name": "Rural Wins", "num": 3}, {"name": "Urban Wins", "num": 4}, {"name": "Total Wins", "num": 3}, {"name": "Speedway Qualify Count", "num": 2}, {"name": "Rural Qualify Count", "num": 4}, {"name": "Urban Qualify Count", "num": 6}, {"name": "Total Qualify Count", "num": 4}, {"name": "Tournament Race Wins", "num": 4}, {"name": "Tournament Race Qualify Count", "num": 3}, {"name": "Unique race tracks completed", "num": 2}]';
const race = new RacingCalculator(toon);

console.log(race.getBestTrophy());