import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default class FishCalculator {
    constructor(data) {
        /**
         * Initialize the calculator by loading fish and the rod type.
         * 
         * @param {string} data: Json containing the toon's fish progress.
         */
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const fishPath = path.join(__dirname, '../data/fish.json');
        this.fishingInfo = JSON.parse(fs.readFileSync(fishPath, 'utf8'));

        const locationPath = path.join(__dirname, '../data/locations.json');
        this.locationInfo = JSON.parse(fs.readFileSync(locationPath, 'utf8'));

        const toon = JSON.parse(data);
        this.rodInfo = this.fishingInfo.rods[toon.rod.name];
        this.caught = this.#getCaught(toon);
        this.catchable = this.getCatchable();
    }

    sortBestLocation() {
        /**
         * Finds the chance of catching a new fish at all locations.
         * 
         * @returns {Object[]} - sorted locations with chance to catch a new fish, descending
         */
        let bestLocation = {};
        // populate probabilities with fish in all locations
        for (const fish of this.getNew()) {
            const fishData = this.#getRarityByLocation(fish);
            for (const pond of fishData) {
                const loc = pond.location;
                if (!(loc in bestLocation)) {
                    bestLocation[loc] = 0;
                }
                bestLocation[loc] += pond.probability; 
            }
        }
        return Object.entries(bestLocation).sort((a,b) => b[1] - a[1]);
    }

    sortBestRarity() {
        /**
         * Sorts all fish by most likely to get new. 
         * 
         * @returns {Array} - sorted fish with their best location, descending
         */
        let probabilities = [];
        for (const fish of this.getNew()) {
            probabilities.push(this.#getBestLocation(fish))
        }
        return probabilities.sort((a,b) => b.probability - a.probability);
    }

    getUncaught() {
        /**
         * Finds all fish the toon hasn't caught.
         * 
         * @returns {Array} gatheredFish - All uncaught fish, regardless of rod
         */
        let gatheredFish = [];
        for (let fish of this.fishingInfo.fish) {
            if (!this.caught.includes(fish)) {
                gatheredFish.push(fish);
            }
        }
        return gatheredFish;
    }

    getCatchable() {
        /**
         * Finds all fish that can be caught.
         *
         * @returns {Array} gatheredFish - The fish that can be caught by rod.
         */
        let gatheredFish = [];
        for (let fish of this.fishingInfo.fish) {
            if (fish.weight_min <= this.rodInfo.weight_max) {
                gatheredFish.push(fish);
            }
        }
        return gatheredFish;
    }

    getNew() {
        /**
         * Finds uncaught, catchable fish.
         * 
         * @returns {Array} - all uncaught, catchable fish
         */
        return this.catchable.filter(fish => !this.caught.includes(fish.name));
    }

    getByLocation(location) {
        /**
         * Finds ALL UNCAUGHT, CATCHABLE fish at the desired location.
         * If a fish has 'Anywhere' and location, they are added twice.
         * If location is a street and a fish has the corresponding playground, they are added again.
         *
         * @param {string} location - The location to get fish from.
         * @returns {Array} gatheredFish - The fish at location.
         */
        let gatheredFish = [];
        for (let fish of this.getNew()) {
            if (fish.locations.includes(location)) {
                gatheredFish.push(fish);
            }
            if (fish.locations.includes('Anywhere')) {
                gatheredFish.push(fish);
            }

            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        gatheredFish.push(fish);
                    }
                }
            }
        }
        return gatheredFish;
    }

    sortByLocation() {
        /**
         * Sorts ALL UNCAUGHT, CATCHABLE fish into a dictionary based on location. Fish may be listed twice if 
         * they are available in various locations.
         *
         * @returns {Object} gatheredFish - Catchable fish sorted by location. 
         */
        let gatheredFish = {};
        for (let fish of getNew()) {
            for (let location of fish.locations) {
                if (!(location in gatheredFish)) {
                    // add new location to array
                    gatheredFish[location] = [];
                }
                gatheredFish[location].push(fish);
            }
        }
        return gatheredFish;
    }

    sortByRarity() {
        /**
         * Sorts ALL UNCAUGHT, CATCHABLE fish into a dictionary based on their rarity. Fish may 
         * be listed twice if they are available in various locations.
         *
         * @returns {Object} gatheredFish - Catchable, uncaught fish sorted by rarity. 
         */
        let gatheredFish = Object.fromEntries(Array.from({length: 10}, (_, i) => [i + 1, []]));
        for (let fish of this.getNew()) {
            let rarityScale = fish.rarity;
            for (let location of fish.locations) {
                gatheredFish[rarityScale].push(fish);
                if (rarityScale < 10) { // max fish rarity
                    rarityScale++;
                }
            }
        }
        return gatheredFish;
    }

    #getBuckets(fish) {
        /**
         * Estimates number of buckets you need to fill to be 90% sure you catch the desired fish
         * 
         * @param {Object[]} fish - desired fish
         * @returns estimated number of buckets
         */
        const confidence = 1 - 0.90;
        const bucketCapacity = 20;
        const catchProb = fish.probability;
        const missProb = 1 - catchProb;

        let attempts = Math.log(confidence) / Math.log(missProb);
        return Math.ceil(attempts / bucketCapacity);
    }

    #getByLocationRarity(location, rarity, arr) {
        /**
         * Finds ALL UNCAUGHT, CATCHABLE fish at the desired location with specified rarity.
         *
         * @param {string} location - The location to get fish from.
         * @param {int} rarity - The desired rarity.
         * @param {Array} arr - Array to find fish with desired location and rarity
         * @returns {Array} gatheredFish - The fish at location with rarity
         */
        let gatheredFish = [];
        for (let fish of arr) {
            let rarityIndex = fish.rarity + fish.locations.indexOf(location);
            if (!(gatheredFish.includes(fish))) {
                // fish rarity caps at 10
                if (rarityIndex > 10) { rarityIndex = 10; }
    
                if (fish.locations.includes(location)) {
                    if (rarityIndex == rarity) {
                        gatheredFish.push(fish);
                    }
                } else if (fish.locations.includes('Anywhere')) {
                    // rarity index changes since Anywhere might be in a different index
                    rarityIndex = fish.rarity + fish.locations.indexOf('Anywhere')
                    if (rarityIndex > 10) { rarityIndex = 10; }
                    if (rarityIndex == rarity) {
                        gatheredFish.push(fish);
                    }
                }
            }
            
            // fish can get added if they have a street and playground
            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        if (!(gatheredFish.includes(fish))) {
                            rarityIndex = fish.rarity + fish.locations.indexOf(playground)
                            if (rarityIndex > 10) { rarityIndex = 10; }
                            if (rarityIndex == rarity) {
                                gatheredFish.push(fish);
                            }
                        }
                    }
                }
            }
        }

        return gatheredFish;
    }

    #getSmallestLocation(arr) {
        const locations = {}
        for (const fish of arr) {
            for (const loc of fish.locations) {
                if (loc != 'Anywhere') {
                    if (!locations[loc]) {
                        locations[loc] = [];
                    }
                    locations[loc].push(fish);
                }
            }
        }

        let minLength = Infinity;
        let minLocation = null;
        for (const loc in locations) {
            if (locations[loc].length < minLength) {
                minLength = locations[loc].length;
                minLocation = loc;
            }
        }
        return locations[minLocation];
    }

    #getCaught(toon) {
        /**
         * Finds and organizes all fish the toon has caught.
         * 
         * @param {string} toon - JSON containing the toon's fish information from the API
         * @returns {Object[]} - JSON of the organized fish
         */
        const fish = [];
        // extract fish from grouped fish types
        for (const key in toon.collection) {
            const album = toon.collection[key].album;
            for (const type in album) {
                fish.push(album[type].name);
            }
        }
        return fish;
    }

    #getBestLocation(fish) {
        /**
         * Chooses highest probability fish location.
         * 
         * @param {Array} fish - to determine probabilities of
         * @returns {Array} - element of best fish location
         */
        return this.#getRarityByLocation(fish).reduce((best, curr) => 
            curr.probability > best.probability ? curr : best,
            { probability: 0, location: null }  
        );
    }

    #getRarity(fish, loc) {
        /**
         * Finds rarity based off fish
         * 
         * @param {Array} fish to determine rarity of
         * @param {String} loc to determine rarity index of
         * @returns rarity
         */
        const rarity = fish.rarity + fish.locations.indexOf(loc)
        return rarity < 10 ? rarity : 10;
    }

    #getRodRarity(fish, loc) {
        /**
         * Finds rod rarity based off fish.
         * 
         * @param {Array} fish to determine rod rarity of
         * @param {String} loc to determine rarity of
         * @returns rod rarity
         */
        const rarity = this.#getRarity(fish, loc);
        return this.rodInfo.probability[rarity-1];
    }
    
    #getRarityByLocation(fish) {
        /**
         * Finds all of fish's probabilities at all their locations.
         * 
         * @param {Array} fish - to determine probabilities of
         * @returns {Array} - elements of fish probabilities at each location
         */
        const probabilities = [];
        let related;
        for (const loc of fish.locations) {
            const rarityFriends = this.sortByRarity()[this.#getRarity(fish,loc)];
            if (loc == 'Anywhere') {
                if (fish.locations[0] == loc) {
                    related = this.#getSmallestLocation(rarityFriends);
                    // related.length is incremented to account for fish not being found
                    probabilities.push( {
                        name: fish.name,
                        probability: this.#getRodRarity(fish, loc) / (related.length+1),
                        location: related[0].locations[0]
                    });
                } else {
                    // anywhere is an extra location; add rarity to all previous locations
                    for (let entry of probabilities) {
                        related = this.#getByLocationRarity(entry.location, this.#getRarity(fish, loc), rarityFriends);
                        // related.length is incremented to account for fish not being found
                        entry.probability += this.#getRodRarity(fish,loc) / (related.length+1);
                    }
                }

            } else {
                // add base rarity 
                related = this.#getByLocationRarity(loc, this.#getRarity(fish,loc), rarityFriends);
                probabilities.push( { 
                    name: fish.name, 
                    probability: this.#getRodRarity(fish,loc) / related.length, 
                    location: loc 
                })

                // add twice if fish occurs twice in one pond
                for (let [playground, streets] of Object.entries(this.locationInfo)) {
                    if (streets.includes(loc) && fish.locations.includes(playground)) {
                            const pgFriends = this.sortByRarity()[this.#getRarity(fish,playground)];
                            related = this.#getByLocationRarity(playground, this.#getRarity(fish,playground), pgFriends);
                            const prev = probabilities.find(entry => entry.location === loc);
                            prev.probability += this.#getRodRarity(fish,playground) / related.length;
                    }
                }
            }
        }

        for (const fish of probabilities) {
            fish.buckets = this.#getBuckets(fish);
        }
        return probabilities;
    }
}