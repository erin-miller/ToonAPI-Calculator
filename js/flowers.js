import fs from 'fs';

export default class FlowersCalculator {
    constructor(data) {
        /*
        Initializes the flower calculator.

        data (JSON String): JSON containing the toon's flower progress.
        */
        this.flower_info = JSON.parse(fs.readFileSync("./data/flowers.json", 'utf8'));
        this.flower_combos = JSON.parse(fs.readFileSync("./data/flowers_combos.json", 'utf8')).flowers;

        const toon = JSON.parse(data);
        this.shovel = toon.shovel;
        this.toon_flowers = this.#extract_toon_flowers(toon);
    }

    #extract_toon_flowers(toon) {
        const flowers = [];
        for (const [key, flower] of Object.entries(toon.collection)) {
            if ('album' in flower) {
                flowers.push(...Object.values(flower.album));
            }
        }
        return flowers;
    }

    get_flower_combo(flower) {
        return this.flower_combos[flower];
    }
}

// get_new_flowers()
    
// get_days_to_upgrade()

// get_progress_flowers()
