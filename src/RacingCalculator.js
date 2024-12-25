export default class RacingCalculator {
    constructor(data) {
        /**
         * Initializes the racing calculator.
         *
         *@param {string} data: JSON containing the toon's race progress.
         */
        this.race_info = null;
        this.loadRacingData();

        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
    }

    async loadRacingData() {
        try {
            const response = await import('/data/race_trophies.json');
            this.race_info = response.trophies;
        } catch (error) {
            console.error('Error loading racing data:', error);
        }
    }

    getBestTrophy() {
        /**
         * Finds the easiest trophies to complete (closest to next requirement)
         * 
         * @returns {Object[]} - JSON containing list of all uncompleted trophies. Index 0 has the easiest trophy.
         *   Each trophy has the following format:
         *       name: The trophy's name (generalized)
         *       progress.current: The current progress
         *       progress.required: The next required trophy value.
         *       progress.difference: The difference to the requirement.
         */
        const trophies = [];
        for (const trophy of this.race_info) {
            const count = this.toon[trophy.description];
            for (const req of trophy.values) {
                if (count < req) {
                    const diff = req - count;
                    const weight = trophy.weight;
                    const score = weight * diff;
                    trophies.push({
                        name: trophy.description,
                        progress: {
                            current: count,
                            required: req,
                            difference: diff
                        },
                        score: score
                    });
                    break;
                }
            }
        }

        trophies.sort((a, b) => a.score - b.score || a.progress.difference - b.progress.difference);
        return trophies;
    }

    getCurrentProgress() {
        /**
         * Finds how many laff points the toon has remaining. (1/2/3)
         * 
         * @returns {int} - containing how many laff boosts the toon has acquired
         */
        let count = 0;
        for (const trophy of this.race_info) {
            const earned = this.toon[trophy.description] || 0;
            for (const val of trophy.values) {
                if (earned >= val) {
                    count += 1;
                }
            }
        }
        return Math.floor(count / 10);
    }

    getTotalEarned() {
        /**
         * Finds how many trophies the toon has earned.
         * 
         * @returns {int} - containing trophies earned
         */
        let count = 0;
        for (const trophy of this.race_info) {
            const earned = this.toon[trophy.description] || 0;
            for (const val of trophy.values) {
                if (earned >= val) {
                    count += 1;
                }
            }
        }
        return count;
    }

    getCompletedTrophies() {
        let count = 0;
        const trophies = [];
        for (const trophy of this.race_info) {
            const earned = this.toon[trophy.description] || 0;
            for (const val of trophy.values) {
                if (earned >= val) {
                    count += 1;
                }
            }
            trophies.push([trophy.description, count]);
            count = 0;
        }
        return trophies;
    }
}
