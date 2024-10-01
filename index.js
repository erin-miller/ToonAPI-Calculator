// index.js
export { default as FishCalculator } from './js/fish.js';
// export { default as FlowersCalculator } from './js/flowers.js';
export { default as GolfCalculator } from './js/golf.js';
export { default as RacingCalculator } from './js/racing.js';
export { default as SuitsCalculator } from './js/suits.js';

import GolfCalculator from './js/golf.js';

const toon = '[{"name": "Courses Completed", "num": 92},{"name": "Courses Under Par", "num": 54},{"name": "Hole In One Shots", "num": 52},{"name": "Eagle Or Better Shots", "num": 44},{"name": "Birdie Or Better Shots", "num": 160},{"name": "Par Or Better Shots", "num": 171},{"name": "Multiplayer Courses Completed", "num": 92},{"name": "Walk In The Par Wins", "num": 5},{"name": "Hole Some Fun Wins", "num": 7},{"name": "The Hole Kit And Caboodle Wins", "num": 10}]';
const golf = new GolfCalculator(toon);

console.log(golf.getBestTrophy());