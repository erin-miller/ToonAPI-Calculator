import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default class SuitsCalculator {
    constructor(data) {
        /**
         *Initializes the suits calculator.
         *
         * @param {string} data - JSON containing the toon's suits progress.
         */
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const jsonPath = path.join(__dirname, '../data/suits.json');
        this.suits_info = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        this.toon = JSON.parse(data);
    }

    getCurrent(department) {
        /**
         * @param {string} department - Value in [c,l,m,s]
         * @returns Toon's current promo experience
         */
        return this.toon[department].promotion.current;
    }

    getTarget(department) {
        /**
         * @param {string} department - Value in [c,l,m,s]
         * @returns Toon's current target experience
         */
        return this.toon[department].promotion.target;
    }

    getNeeded(department) {
        /**
         * @param {string} department - Value in [c,l,m,s]
         * @returns Toon's needed experience to promo
         */
        return this.getTarget(department) - this.getCurrent(department);
    }

    getBestPathWeighted(department) {
        /**
         * Returns the optimal facility path to get to promotion, with facilities weighted by time.
         *
         * @param {string} department - Value in [c,l,m,s]
         * @returns {Object[]} - JSON with optimal path and total value
         *   If toon is maxed or has promotion, it will return with a message.
         *   If toon does not have a disguise, it will return with a message.
         */
        const facilities = this.#getFacilityData(department);
        const toonInfo = this.toon[department];

        if (toonInfo.hasDisguise) {
            const target = toonInfo.promotion.target;

            const margin = target * 0.1; 
            const adjustedTarget = target + margin;
          
            facilities.sort((a,b) => {
                return (b.value / b.weight) - (a.value / a.weight);
            })
          
            let total = 0;
            let path = [];
          
            for (const facility of facilities) {
                while (total < adjustedTarget) {
                    if (total + facility.value <= adjustedTarget) {
                    total += facility.value;
                    path.push(facility.name + " " + facility.value);
                    } else {
                        break;
                    }
                }
                if (total >= adjustedTarget) {
                    break; // Stop if we've met or exceeded the adjusted target
                }
            }

            return {
                path: path,
                total: total
            };

        } else {
            return {
                path: [],
                total: -1,
                message: "Toon does not have a disguise."
            };
        }
    }

    getBestPath(department) {
        /**
         * Returns the optimal facility path to get to promotion.
         *
         * @param {string} department - Value in [c,l,m,s]
         * @returns {Object[]} - JSON with optimal path and total value
         *   If toon is maxed or has promotion, it will return with a message.
         *   If toon does not have a disguise, it will return with a message.
         */
        const facilities = this.#getFacilityData(department);
        const toonInfo = this.toon[department];

        if (toonInfo.hasDisguise) {
            const target = toonInfo.promotion.target;

            const margin = target * 0.1; 
            const adjustedTarget = target + margin;
          
            let total = 0;
            let path = [];
          
            for (const facility of facilities) {
                while (total < adjustedTarget) {
                    if (total + facility.value <= adjustedTarget) {
                    total += facility.value;
                    path.push(facility.name + " " + facility.value);
                    } else {
                        break;
                    }
                }
                if (total >= adjustedTarget) {
                    break; // Stop if we've met or exceeded the adjusted target
                }
            }

            return {
                path: path,
                total: total
            };

        } else {
            return {
                path: [],
                total: -1,
                message: "Toon does not have a disguise."
            };
        }
    }

    #getFacilityData(department) {
        /**
         * Grabs facility data based off of department.
         *
         * @param {string} department - Value in [c,l,m,s]
         * @returns The corresponding department's facility information and values
         */
        const facility = this.suits_info.suitTypes[department].facility;
        return this.suits_info.facilities[facility];
    }
}
    

