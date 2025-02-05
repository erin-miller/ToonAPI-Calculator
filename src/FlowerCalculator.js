import flowerCombos from '../data/flowers_combos.json' assert { type: 'json' };;
import gardenData from '../data/flowers.json' assert { type: 'json' }; 

export default class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the flower calculator.
         *
         * @param {string} data: JSON containing the toon's flower progress.
         */
        this.combos = flowerCombos.flowers;
        this.tiers = gardenData.flowers;
        this.shovels = gardenData.shovels;
        this.toon = JSON.parse(data);
    }

    getCombo(num) {
        /**
         * Returns all flowers with num length combo
         * 
         * @param {int} num of the jellybean combo
         * @returns array of flowers with num combos
         */
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }

    getWateringCan() {
        /**
         * @return the watering can name, current skill, and max skill
         */
        return [this.toon.wateringCan.name, this.toon.wateringCan.curSkill, this.toon.wateringCan.maxSkill];
    }

    getShovel() {
        /**
         * @return the shovel name, current skill, and max skill
         */
        return [this.toon.shovel.name, this.toon.shovel.curSkill, this.toon.shovel.maxSkill]
    }

    getHighestCombo() {
        /** TODO:
         * Finds the toon's highest jellybean combo and returns all flowers in that combo
         * 
         * @return highest jellybean combo flowers
         */
    }

    getMissingFlowers() {
        /** TODO:
         * Finds the toon's missing flowers, including ones they can't plant
         * @return all missing flower combos
         */
        const flowers = [];
        for (const flower in this.combos) {
            let isOwned = false;
    
            for (const id in this.toon.collection) {
                const flower = this.toon.collection[id];
    
                if (Object.entries(flower.album).includes(flower)) {
                    isOwned = true;
                    break; // No need to continue checking this flower
                }
            }
    
            if (!isOwned) {
                flowers.push({ name: flower, combo: this.combos[flower]});
            }
        }
    
        return flowers;
    }

    getMissingAvailableFlowers() {
        /** TODO:
         * Finds the toon's missing flowers that can still be planted
         * @return missing available flower combos
         */
    }

    getDaysToUpgrade() {
        /** TODO:
         * Finds the days until next shovel and watering can
         * @return days til upgrade for shovel and watering can
         */

    }

    getEarnedFlowers() {
        /**
         * Finds the toon's planted flowers
         * @return all current earned flowers
         */
        const flowers = [];

        for (const id in this.toon.collection) {
            const flower = this.toon.collection[id];
            Object.entries(flower.album).forEach(combo => {
                if (this.combos[combo[1]]) {
                    flowers.push({ name: combo[1], combo: this.combos[combo[1]] });
                }
            });
        }

        return flowers;
    }
}