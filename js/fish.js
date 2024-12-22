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
        this.caught = this.#getCaughtBy(toon);
        this.catchable = this.getCatchable();
        this.bonus = 1.1;
    }

    sortBestLocation() {
        /**
         * Finds the chance of catching a new fish at all locations.
         * 
         * @returns {Object[]} - sorted locations with chance to catch a new fish, descending
         */
    
        const locations = this.#getLocationRanks();
        const bestLocation = {};
        let buckets;

        for (const [location, rarities] of Object.entries(locations)) {
            const total = Math.min(Object.values(rarities).reduce((sum,value) => sum+value, 0), 1);
            buckets = this.#getBucketsByLocation(total);
            
            if (buckets !== 0) {
                const playground = Object.entries(this.locationInfo).find(([pg, streets]) => streets.includes(location));

                if (playground) {
                    const playgroundProb = bestLocation[playground[0]]?.total || 0;
                    // Exclude street if it has the same probability as the playground
                    if (playgroundProb === total) continue;
                }
                
                bestLocation[location] = { total, buckets };
            }
        }
        
        return Object.entries(bestLocation).sort((a,b) => b[1].total - a[1].total);
    }

    sortBestRarity() {
        /**
         * Sorts all fish by most likely to get new. 
         * 
         * @returns {Array} - sorted fish with their best location, descending
         */
        let probabilities = [];
        for (const fish of this.getNew()) {
            probabilities.push(this.#getHighestProbability(fish))
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

    getCaught() {
        /**
         * Returns the fish that the toon has caught.
         * 
         * @returns {Array} caught
         */
        return this.caught;
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
         * Finds ALL catchable fish at the desired location.
         * If a fish has 'Anywhere', they are added.
         * If a fish has location, they are added.
         * If location is a street, the playground's fish are added.
         *
         * @param {string} location - The location to get fish from.
         * @returns {Array} gatheredFish - The fish at location.
         */
        let gatheredFish = [];
        for (let fish of this.getCatchable()) {
            if (fish.locations.includes(location)) {
                gatheredFish.push(fish);
            }
            if (fish.locations.includes('Anywhere')) {
                gatheredFish.push(fish);
            }

            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (playground === location) { // location is a playground
                    if (streets.some(street => fish.locations.includes(street))) {
                        // add if fish is located in pg street
                        gatheredFish.push(fish);
                    }
                }
            }
        }

        // add playground fish 
        for (let [playground, streets] of Object.entries(this.locationInfo)) {
            if (streets.includes(location)) {
                let pgFish = this.getByLocation(playground)
                pgFish.forEach(fish => gatheredFish.push(fish));
            }
        }
        return gatheredFish;
    }

    sortByRarity() {
        /**
         * Sorts ALL CATCHABLE fish into a dictionary based on their rarity. Fish may 
         * be listed twice if they are available in various locations.
         *
         * @returns {Object} gatheredFish - Catchable, uncaught fish sorted by rarity. 
         */
        let gatheredFish = Object.fromEntries(Array.from({length: 10}, (_, i) => [i + 1, []]));
        for (let fish of this.catchable) {
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

    #getBucketsByLocation(total) {
        /**
         * Estimates number of buckets you need to fill to be 90% sure you catch a new fish
         * at this location
         * 
         * @param {int} total probability of location
         * @returns estimated number of buckets
         */
        if (total >= 1) {
            return 1;
        } else if (total <= 0) {
            return 0;
        }
        const confidence = 1 - 0.90;
        const bucketCapacity = 20;
        const missProb = 1 - total;

        const attempts = Math.log(confidence) / Math.log(missProb);
        return Math.ceil(attempts / bucketCapacity);
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

        const attempts = Math.log(confidence) / Math.log(missProb);
        return Math.ceil(attempts / bucketCapacity);
    }

    #getByLocationRarity(location, rarity) {
        /**
         * Finds ALL filterFish at the desired location with specified rarity.
         *
         * @param {string} location - The location to get fish from.
         * @param {int} rarity - The desired rarity.
         * @returns {Array} gatheredFish - The fish at location with rarity
         */
        let gatheredFish = [];
        const fishList = this.getByLocation(location);
        
        const fishMatch = (loc, rar, fish) => {
            const rarityIndex = this.#getRarity(fish, loc);
            if (rarityIndex === rar && !gatheredFish.includes(fish)) {
                gatheredFish.push(fish);
            }
        }

        const playground = Object.entries(this.locationInfo).find(([pg, streets]) => streets.includes(location))?.[0];

        for (let fish of fishList) {
            if (fish.locations.includes(location)) {
                fishMatch(location, rarity, fish);
            }
            
            if (playground && fish.locations.includes(playground)) {
                fishMatch(playground, rarity, fish);
            }

            if (fish.locations.includes('Anywhere')) {
                fishMatch('Anywhere', rarity, fish);
            }

            // fish can get added if they have a street and playground
            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (playground === location && streets.some(street => fish.locations.includes(street)) && !gatheredFish.includes(fish)) {
                    fishMatch(playground, rarity, fish);
                }
            }
        }

        return gatheredFish;
    }

    #getLocationRanks() {
        /**
         * Calculates the chance of catching a new fish in each rarity for each location
         * 
         * @returns all locations with new fish probability in each rarity
         */
        let locations = {};

        for (const pg in this.locationInfo) {
            locations[pg] = this.#getRarityByLocation(pg);
            for (const street of this.locationInfo[pg]) {
                locations[street] = this.#getRarityByLocation(street);
            }
        }
        return locations;
    }

    #getRarityByLocation(location) {
        const data = {};

        for (let rarity = 1; rarity <= 10; rarity++) {
            const rarityFish = this.#getByLocationRarity(location, rarity);
            const rodRarity = this.rodInfo.probability[rarity - 1];
            if (rarityFish.length > 0) {
                const totalFish = rarityFish.length;
                const newFish = rarityFish.filter(fish => !this.caught.includes(fish.name));
                data[rarity] = rodRarity * (newFish.length / totalFish);
            } else {
                data[rarity] = 0;
            }
        }
        return data;
    }

    #checkBonus(fish, loc) {
        /**
         * Applies probability bonus if applicable.
         * @param fish to check
         * @param loc to check
         * @returns probability multiplier
         */
        if (fish.bonus && fish.bonus === loc) {
            return this.bonus;
        } else {
            return 1;
        }
    }

    #getSmallestLocation(filterFish) {
        /**
         * Find the smallest location size based on filterFish
         * 
         * @param {Array} filterFish to find smallest location of
         * @returns {Array} containing the smallest location and its fish
         */
        const locations = {}
        for (const fish of filterFish) {
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

    #getCaughtBy(toon) {
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

    #getHighestProbability(fish) {
        /**
         * Chooses highest probability fish location.
         * 
         * @param {Array} fish - to determine probabilities of
         * @returns {Array} - element of best fish location
         */
        return this.#getLocationProbabilities(fish).reduce((best, curr) => 
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
    
    #getLocationProbabilities(fish) {
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
                        related = this.#getByLocationRarity(entry.location, this.#getRarity(fish, loc));
                        // related.length is incremented to account for fish not being found
                        entry.probability += this.#getRodRarity(fish,loc) / (related.length+1);
                    }
                }

            } else {
                // add base rarity 
                for (let [playground, streets] of Object.entries(this.locationInfo)) {
                    if (loc === playground) {
                        // get fish of rarity in playground
                        const pgRarity = this.#getRarity(fish,playground)
                        related = this.#getByLocationRarity(playground, pgRarity);

                        // add pg fish to every street related
                        const prob = this.#getRodRarity(fish, playground) * this.#checkBonus(fish, playground)
                        for (let street of streets) {
                            const existing = probabilities.find(entry => entry.name === fish.name && entry.location === street);
                            if (!existing) {
                                const stRelated = this.#getByLocationRarity(street, pgRarity)
                                const total = related.length + stRelated.length;
                                probabilities.push({
                                    name: fish.name,
                                    probability: prob / total,
                                    location: street
                                })
                            }
                        }
                    } else {
                        // location is a street; gets added individually
                        related = this.#getByLocationRarity(loc, this.#getRarity(fish,loc));
                        const prob = this.#getRodRarity(fish, loc) * this.#checkBonus(fish, loc)

                        probabilities.push( { 
                            name: fish.name, 
                            probability: prob / related.length, 
                            location: loc 
                        })
                    }
                }
            }
        }
        
        for (const item of probabilities) {
            item.buckets = this.#getBuckets(item);
        }
        
        return probabilities;
    }
}