export default class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the flower calculator.
         *
         * @param {string} data: JSON containing the toon's flower progress.
         */
        this.combos = null;
        this.loadFlowerData();

        this.toon = JSON.parse(data);
    }

    async loadFlowerData() {
        try {
            const data = await import('../data/flowers_combos.json');
            this.golf_info = data.flowers;
        } catch (error) {
            console.error('Error loading flower data:', error);
        }
    }

    getCombo(num) {
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }
}