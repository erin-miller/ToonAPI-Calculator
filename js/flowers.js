import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
export default class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the golf calculator.
         *
         * @param {string} data: JSON containing the toon's golf progress.
         */
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const jsonPath = path.join(__dirname, '../data/flowers_combos.json');
        this.combos = JSON.parse(fs.readFileSync(jsonPath, 'utf8')).flowers;

        this.toon = JSON.parse(data);
    }

    getCombo(num) {
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }
}