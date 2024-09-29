import fs from 'fs';

export default class RacingCalculator {
    constructor(data) {
        /**
        Initializes the racing calculator.

        @param {string} data: JSON containing the toon's race progress.
        */
        const fileContent = fs.readFileSync("../data/race_trophies.json", 'utf8');
        this.race_info = JSON.parse(fileContent).trophies;

        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
    }

    getBestTrophy() {
        /**
        Finds the easiest trophies to complete (closest to next requirement)

        @returns {Object[]} - JSON containing list of all uncompleted trophies. Index 0 has the easiest trophy.
            Each trophy has the following format:
                name: The trophy's name (generalized)
                progress.current: The current progress
                progress.required: The next required trophy value.
                progress.difference: The difference to the requirement.
        */
        const trophies = [];
        for (const trophy of this.race_info) {
            const count = this.toon[trophy.description];
            for (const req of trophy.values) {
                if (count < req) {
                    trophies.push({
                        name: trophy.description,
                        progress: {
                            current: count,
                            required: req,
                            difference: req - count,
                        }
                    });
                    break;
                }
            }
        }

        trophies.sort((a, b) => a.progress.difference - b.progress.difference);
        return trophies;
    }
}

