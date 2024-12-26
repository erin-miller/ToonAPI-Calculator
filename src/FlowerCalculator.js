import flowerData from '../data/flowers_combos.json' assert { type: 'json' };;
export default class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the flower calculator.
         *
         * @param {string} data: JSON containing the toon's flower progress.
         */
        this.combos = flowerData;

        this.toon = JSON.parse(data);
    }

    getCombo(num) {
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }
}