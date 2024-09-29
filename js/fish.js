import fs from 'fs';

export default class FishCalculator {
    constructor(rod) {
        /**
         * Initialize the calculator by loading fish and the rod type.
         */
        this.fishing_info = JSON.parse(fs.readFileSync("./data/fish.json", 'utf8'));
        this.location_info = JSON.parse(fs.readFileSync("./data/locations.json", 'utf8'));
        this.caught = JSON.parse(fs.readFileSync("./data/caught_fish.json", 'utf8'));

        this.rod_info = "twig"; // default
        this.set_rod(rod);
        this.catchable = this.get_catchable();
    }

    _get_all_fish_at_location(location) {
        /**
         * Finds ALL fish at the desired location.
         * If a fish has 'Anywhere' and location, they are added twice.
         * If location is a street and a fish has the corresponding playground, they are added again.
         *
         * @param {string} location - The location to get fish from.
         * @returns {Array} gathered_fish - The fish at location.
         */
        let gathered_fish = [];
        for (let fish of this.fishing_info.fish) {
            if (fish.locations.includes(location)) {
                gathered_fish.push(fish);
            }
            if (fish.locations.includes('Anywhere')) {
                gathered_fish.push(fish);
            }

            for (let [playground, streets] of Object.entries(this.location_info)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        gathered_fish.push(fish);
                    }
                }
            }
        }

        return gathered_fish;
    }

    _sort_all_fish_by_rarity() {
        /**
         * Sorts ALL fish into a dictionary based on their rarity. Fish may 
         * be listed twice if they are available in various locations.
         *
         * @returns {Object} gathered_fish - Fish sorted by rarity. 
         */
        let gathered_fish = Object.fromEntries(Array.from({length: 10}, (_, i) => [i + 1, []]));
        for (let fish of this.fishing_info.fish) {
            let rarity_scale = fish.rarity;
            for (let location of fish.locations) {
                gathered_fish[rarity_scale].push(fish);
                if (rarity_scale < 10) { // max fish rarity
                    rarity_scale++;
                }
            }
        }
        return gathered_fish;
    }

    _sort_all_fish_by_location() {
        /**
         * Sorts ALL fish into a dictionary based on location. Fish may be listed twice if 
         * they are available in various locations.
         *
         * @returns {Object} gathered_fish - Fish sorted by location. 
         */
        let gathered_fish = {};
        for (let fish of this.fishing_info.fish) {
            for (let location of fish.locations) {
                if (!(location in gathered_fish)) {
                    gathered_fish[location] = [];
                }
                gathered_fish[location].push(fish);
            }
        }
        return gathered_fish;
    }

    set_rod(rod) {
        /**
         * Set a new rod.
         */
        this.rod_info = this.fishing_info.rods[rod];
        this.catchable = this.get_catchable();
    }

    get_catchable() {
        /**
         * Finds all fish that can be caught by the desired rod.
         *
         * @returns {Array} gathered_fish - The fish that can be caught by rod.
         */
        let gathered_fish = [];
        for (let fish of this.fishing_info.fish) {
            if (fish.weight_min <= this.rod_info['weight-max']) {
                gathered_fish.push(fish);
            }
        }
        return gathered_fish;
    }

    get_fish_at_location(location) {
        /**
         * Finds ALL CATCHABLE fish at the desired location.
         * If a fish has 'Anywhere' and location, they are added twice.
         * If location is a street and a fish has the corresponding playground, they are added again.
         *
         * @param {string} location - The location to get fish from.
         * @returns {Array} gathered_fish - The fish at location.
         */
        let gathered_fish = [];
        for (let fish of this.catchable) {
            if (fish.locations.includes(location)) {
                gathered_fish.push(fish);
            }
            if (fish.locations.includes('Anywhere')) {
                gathered_fish.push(fish);
            }

            for (let [playground, streets] of Object.entries(this.location_info)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        gathered_fish.push(fish);
                    }
                }
            }
        }

        return gathered_fish;
    }

    sort_fish_by_location() {
        /**
         * Sorts ALL CATCHABLE fish into a dictionary based on location. Fish may be listed twice if 
         * they are available in various locations.
         *
         * @returns {Object} gathered_fish - Catchable fish sorted by location. 
         */
        let gathered_fish = {};
        for (let fish of this.catchable) {
            for (let location of fish.locations) {
                if (!(location in gathered_fish)) {
                    gathered_fish[location] = [];
                }
                gathered_fish[location].push(fish);
            }
        }
        return gathered_fish;
    }

    sort_fish_by_rarity() {
        /**
         * Sorts ALL CATCHABLE fish into a dictionary based on their rarity. Fish may 
         * be listed twice if they are available in various locations.
         *
         * @returns {Object} gathered_fish - Catchable fish sorted by rarity. 
         */
        let gathered_fish = Object.fromEntries(Array.from({length: 10}, (_, i) => [i + 1, []]));
        for (let fish of this.catchable) {
            let rarity_scale = fish.rarity;
            for (let location of fish.locations) {
                gathered_fish[rarity_scale].push(fish);
                if (rarity_scale < 10) { // max fish rarity
                    rarity_scale++;
                }
            }
        }
        return gathered_fish;
    }

    sort_best_location() {
        /**
         * Sorts all locations by most likely to get new fish.
         * To calculate, divide a fish's probability by the amount of fish available in their rarity.
         * If a fish has multiple entries, add their divided probabilities together.
         */
        let probabilities = {};
        let all_locs = this._sort_all_fish_by_location();

        // for fish in all_locs:

        // return best_locals
    }

    sort_best_fish() {
        /**
         * Sorts all fish by most likely to get new. 
         */
        let probabilities = {};

        for (let fish of this.catchable) {
            let rarity_scale = fish.rarity;
            let fish_prob = this.rod_info.probability[rarity_scale - 1];

            // get fish in the same rarity and fish in their best pond
            let rarity_friends = this.sort_fish_by_rarity()[rarity_scale];
            let top_pond = this.get_fish_at_location(fish.locations[0]);
            // remap to just names
            rarity_friends = new Set(rarity_friends.map(f => f.name));
            top_pond = new Set(top_pond.map(f => f.name));
            // find intersection
            let total_fish = new Set([...rarity_friends].filter(x => top_pond.has(x)));

            let prob = fish_prob / total_fish.size;
            
            if (!(fish.name in probabilities)) {
                probabilities[fish.name] = 0;
            }

            probabilities[fish.name] += prob;
        }

        let sorted_fish = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);
        return sorted_fish;
    }
}