import fs from 'fs';

export default class GolfCalculator {
    constructor(data) {
        /*
        Initializes the golf calculator.

        data (JSON String): JSON containing the toon's golf progress.
        */
        const fileContent = fs.readFileSync("../data/golf_trophies.json", 'utf8');
        this.golf_info = JSON.parse(fileContent).trophies;

        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
    }

    getBestTrophy() {
        /*
        Finds the easiest trophies to complete (closest to next requirement)

        Returns: JSON containing list of all uncompleted trophies. Index 0 has the easiest trophy.
            Each trophy has the following format:
                name: The trophy's name (generalized)
                progress.current: The current progress
                progress.required: The next required trophy value.
                progress.difference: The difference to the requirement.
        */
        const trophies = [];
        for (const trophy of this.golf_info) {
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
        return JSON.stringify(trophies);
    }
}

