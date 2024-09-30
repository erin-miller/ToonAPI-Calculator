import fs from 'fs';

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
        const locationPath = path.join(__dirname, '../data/fish.json');
        this.fishingInfo = JSON.parse(fs.readFileSync(fishPath, 'utf8'));
        this.locationInfo = JSON.parse(fs.readFileSync(locationPath, 'utf8'));

        const toon = JSON.parse(data);
        this.rodInfo = this.fishingInfo.rods[toon.rod['name']];
        this.caught = this.#getCaught(toon);
        this.catchable = this.getCatchable();
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
    
    #intersect(arr1, arr2) {
        /**
         * Intersects two arrays.
         * 
         * @param {Array} arr1 - first array
         * @param {Array} arr2 - second array
         * @returns {Array} intersected - intersection of both arrays
         */
        arr1 = new Set(this.catchable);
        return arr2.filter(value => arr1.has(value));
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
         * Finds all fish that can be caught by the desired rod.
         *
         * @returns {Array} gathered_fish - The fish that can be caught by rod.
         */
        let gathered_fish = [];
        for (let fish of this.fishingInfo.fish) {
            if (fish.weight_min <= this.rodInfo['weight-max']) {
                gathered_fish.push(fish);
            }
        }
        return gathered_fish;
    }

    getNew() {
        /**
         * Finds uncaught, catchable fish.
         * 
         * @returns {Array} - all uncaught, catchable fish
         */
        return this.#intersect(this.getUncaught(), this.getCatchable());
    }

    getByLocation(location) {
        /**
         * Finds ALL UNCAUGHT, CATCHABLE fish at the desired location.
         * If a fish has 'Anywhere' and location, they are added twice.
         * If location is a street and a fish has the corresponding playground, they are added again.
         *
         * @param {string} location - The location to get fish from.
         * @returns {Array} gathered_fish - The fish at location.
         */
        let gathered_fish = [];
        for (let fish of this.getNew()) {
            if (fish.locations.includes(location)) {
                gathered_fish.push(fish);
            }
            if (fish.locations.includes('Anywhere')) {
                gathered_fish.push(fish);
            }

            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        gathered_fish.push(fish);
                    }
                }
            }
        }

        return gathered_fish;
    }

    getByLocationRarity(location, rarity, arr) {
        /**
         * Finds ALL UNCAUGHT, CATCHABLE fish at the desired location with specified rarity.
         *
         * @param {string} location - The location to get fish from.
         * @param {int} rarity - The desired rarity.
         * @param {Array} arr - Array to find fish with desired location and rarity
         * @returns {Array} gathered_fish - The fish at location with rarity
         */
        let gathered_fish = [];
        for (let fish of arr) {
            let rarityIndex = fish.rarity + fish.locations.indexOf(location);
            // fish rarity caps at 10
            if (rarityIndex > 10) { rarityIndex = 10; }

            if (fish.locations.includes(location)) {
                if (rarityIndex == rarity) {
                    gathered_fish.push(fish);
                }
            } else if (fish.locations.includes('Anywhere')) {
                // rarity index changes since Anywhere might be in a different index
                rarityIndex = fish.rarity + fish.locations.indexOf('Anywhere')
                if (rarityIndex > 10) { rarityIndex = 10; }
                if (rarityIndex == rarity) {
                    gathered_fish.push(fish);
                }
            }
            
            // fish can get added if they have a street and playground
            for (let [playground, streets] of Object.entries(this.locationInfo)) {
                if (streets.includes(location)) {
                    if (fish.locations.includes(playground)) {
                        rarityIndex = fish.rarity + fish.locations.indexOf(playground)
                        if (rarityIndex > 10) { rarityIndex = 10; }
                        if (rarityIndex == rarity) {
                            gathered_fish.push(fish);
                        }
                    }
                }
            }
        }

        return gathered_fish;
    }

    sortByLocation() {
        /**
         * Sorts ALL UNCAUGHT, CATCHABLE fish into a dictionary based on location. Fish may be listed twice if 
         * they are available in various locations.
         *
         * @returns {Object} gathered_fish - Catchable fish sorted by location. 
         */
        let gathered_fish = {};
        for (let fish of getNew()) {
            for (let location of fish.locations) {
                if (!(location in gathered_fish)) {
                    // add new location to array
                    gathered_fish[location] = [];
                }
                gathered_fish[location].push(fish);
            }
        }
        return gathered_fish;
    }

    sortByRarity() {
        /**
         * Sorts ALL UNCAUGHT, CATCHABLE fish into a dictionary based on their rarity. Fish may 
         * be listed twice if they are available in various locations.
         *
         * @returns {Object} gathered_fish - Catchable, uncaught fish sorted by rarity. 
         */
        let gathered_fish = Object.fromEntries(Array.from({length: 10}, (_, i) => [i + 1, []]));
        for (let fish of this.getNew()) {
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

    sortBestLocation() {
        /**
         * Finds the chance of catching a new fish at all locations.
         * 
         * @returns {Object[]} - sorted locations with chance to catch a new fish, descending
         */
        let bestLocation = {};
        // populate probabilities with fish in all locations
        for (const fish of this.getNew()) {
            const fishData = this.#getBestLocation(fish);
            for (const pond of fishData) {
                const loc = pond['location'];
                if (!(loc in bestLocation)) {
                    bestLocation[loc] = 0;
                }
                bestLocation[loc] += pond['probability']; 
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
            probabilities.push(this.#getBestRarity(fish))
        }
        return probabilities.sort((a,b) => b.probability - a.probability);
    }

    #getBestRarity(fish) {
        const probabilities = [];
        const fishRarity = fish['rarity'];
        const fishRarityPlus = fishRarity < 10 ? fishRarity+1 : fishRarity;
        const rodProbability = this.rodInfo['probability'][fishRarity-1]
        const rodProbabilityPlus = this.rodInfo['probability'][fishRarityPlus-1];

        for (const loc of fish['locations']) {
            let relatedFish;
            let rarityFriends;
            let numFish;
            if (loc == 'Anywhere' && probabilities.length > 0) {
                // add rarity to all previous locations
                rarityFriends = this.sortByRarity()[fishRarityPlus];
                relatedFish = this.getByLocationRarity(loc, fishRarityPlus, rarityFriends);
                numFish = relatedFish.length > 0 ? relatedFish.length : 1;
                for (let entry of probabilities) {
                    entry.probability += rodProbabilityPlus / numFish;
                }
            } else {
                rarityFriends = this.sortByRarity()[fishRarity];
                relatedFish = this.getByLocationRarity(loc, fishRarity, rarityFriends);
                numFish = relatedFish.length > 0 ? relatedFish.length : 1;
                probabilities.push( { 
                    name: fish['name'], 
                    probability: rodProbability / numFish, 
                    location: loc 
                })
                
                // add twice if fish is located in street and playground
                for (let [playground, streets] of Object.entries(this.locationInfo)) {
                    if (streets.includes(loc)) {
                        if (fish.locations.includes(playground)) {
                            rarityFriends = this.sortByRarity()[fishRarityPlus];
                            relatedFish = this.getByLocationRarity(loc, fishRarityPlus, rarityFriends);
                            numFish = relatedFish.length > 0 ? relatedFish.length : 1;

                            const prev = probabilities.find(entry => entry.location === loc);
                            prev.probability += rodProbabilityPlus / numFish;
                        };
                    }
                }
            }

        }
        return probabilities.reduce((best, curr) => 
            curr.probability > best.probability ? curr : best,
            { probability: 0, location: null }  
        );
    }
    
    #getBestLocation(fish) {
        const probabilities = [];
        const fishRarity = fish['rarity'];
        const fishRarityPlus = fishRarity < 10 ? fishRarity+1 : fishRarity;
        const rodProbability = this.rodInfo['probability'][fishRarity-1]
        const rodProbabilityPlus = this.rodInfo['probability'][fishRarityPlus-1];

        for (const loc of fish['locations']) {
            let relatedFish;
            let rarityFriends;
            let numFish;
            if (loc == 'Anywhere' && probabilities.length > 0) {
                // add rarity to all previous locations
                rarityFriends = this.sortByRarity()[fishRarityPlus];
                relatedFish = this.getByLocationRarity(loc, fishRarityPlus, rarityFriends);
                numFish = relatedFish.length > 0 ? relatedFish.length : 1;
                for (let entry of probabilities) {
                    entry.probability += rodProbabilityPlus / numFish;
                }
            } else {
                rarityFriends = this.sortByRarity()[fishRarity];
                relatedFish = this.getByLocationRarity(loc, fishRarity, rarityFriends);
                numFish = relatedFish.length > 0 ? relatedFish.length : 1;
                probabilities.push( { 
                    name: fish['name'], 
                    probability: rodProbability / numFish, 
                    location: loc 
                })
                
                // add twice if fish is located in street and playground
                for (let [playground, streets] of Object.entries(this.locationInfo)) {
                    if (streets.includes(loc) && fish.locations.includes(playground)) {
                            rarityFriends = this.sortByRarity()[fishRarityPlus];
                            relatedFish = this.getByLocationRarity(loc, fishRarityPlus, rarityFriends);
                            numFish = relatedFish.length > 0 ? relatedFish.length : 1;

                            const prev = probabilities.find(entry => entry.location === loc);
                            prev.probability += rodProbabilityPlus / numFish;
                            
                    }
                }
            }

        }
        return probabilities;
    }
}