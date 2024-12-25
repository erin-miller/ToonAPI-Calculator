class FishCalculator {
    constructor(data) {
        /**
         * Initialize the calculator by loading fish and the rod type.
         * 
         * @param {string} data: Json containing the toon's fish progress.
         */
        this.fishingInfo = null;
        this.loadFishData();

        this.locationInfo = null;
        this.loadLocationData();

        const toon = JSON.parse(data);
        this.rodInfo = this.fishingInfo.rods[toon.rod.name];
        this.caught = this.#getCaughtBy(toon);
        this.catchable = this.getCatchable();
        this.bonus = 1.1;
    }

    async loadFishData() {
        try {
            const response = await import('../../../../../data/fish.json');
            this.fishingInfo = response;
        } catch (error) {
            console.error('Error loading fish data:', error);
        }
    }

    async loadLocationData() {
        try {
            const response = await import('../../../../../data/locations.json');
            this.locationInfo = response;
        } catch (error) {
            console.error('Error loading locations data:', error);
        }
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
            probabilities.push(this.#getHighestProbability(fish));
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
                let pgFish = this.getByLocation(playground);
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
        };

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
        const locations = {};
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
        const rarity = fish.rarity + fish.locations.indexOf(loc);
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
                        const pgRarity = this.#getRarity(fish,playground);
                        related = this.#getByLocationRarity(playground, pgRarity);

                        // add pg fish to every street related
                        const prob = this.#getRodRarity(fish, playground) * this.#checkBonus(fish, playground);
                        for (let street of streets) {
                            const existing = probabilities.find(entry => entry.name === fish.name && entry.location === street);
                            if (!existing) {
                                const stRelated = this.#getByLocationRarity(street, pgRarity);
                                const total = related.length + stRelated.length;
                                probabilities.push({
                                    name: fish.name,
                                    probability: prob / total,
                                    location: street
                                });
                            }
                        }
                    } else {
                        // location is a street; gets added individually
                        related = this.#getByLocationRarity(loc, this.#getRarity(fish,loc));
                        const prob = this.#getRodRarity(fish, loc) * this.#checkBonus(fish, loc);

                        probabilities.push( { 
                            name: fish.name, 
                            probability: prob / related.length, 
                            location: loc 
                        });
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

class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the flower calculator.
         *
         * @param {string} data: JSON containing the toon's flower progress.
         */
        this.combos = null;
        this.loadFlowerData();

        this.toon = JSON.parse(data);
    }

    async loadFlowerData() {
        try {
            const data = await import('../../../../../data/flowers_combos.json');
            this.golf_info = data.flowers;
        } catch (error) {
            console.error('Error loading flower data:', error);
        }
    }

    getCombo(num) {
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }
}

class GolfCalculator {
    constructor(data) {
        /**
         * Initializes the golf calculator.
         *
         * @param {string} data: JSON containing the toon's golf progress.
         */
        this.golf_info = null;
        this.loadGolfData;

        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
    }
    
    async loadGolfData() {
        try {
            const response = await import('../../../../../data/golf_trophies.json');
            this.golf_info = response.trophies;
        } catch (error) {
            console.error('Error loading golf data:', error);
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
        for (const trophy of this.golf_info) {
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
        for (const trophy of this.golf_info) {
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
        for (const trophy of this.golf_info) {
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
        for (const trophy of this.golf_info) {
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

class RacingCalculator {
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
            const response = await import('../../../../../data/race_trophies.json');
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

class SuitsCalculator {
    constructor(data) {
        /**
         *Initializes the suits calculator.
         *
         * @param {string} data - JSON containing the toon's suits progress.
         */
        this.suits_info = null;
        this.loadSuitsData();

        this.toon = JSON.parse(data);
    }

    async loadSuitsData() {
        try {
            const response = await import('../../../../../data/suits.json');
            this.suits_info = response;
        } catch (error) {
            console.error('Error loading suits data:', error);
        }
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
        const toonInfo = this.toon[department];
        
        if (!toonInfo.hasDisguise) {
            return {
                path: [],
                total: -1,
                message: "Toon does not have a disguise."
            };
        }

        if (toonInfo.promotion.target === toonInfo.promotion.current) {
            return {
                path: [],
                total: -2,
                message: "Toon has their promotion."
            }
        }
        
        const facilities = this.#getFacilityData(department);
        let remaining = toonInfo.promotion.target - toonInfo.promotion.current;
            
        facilities.sort((a,b) => {
            return (b.value / b.weight) - (a.value / a.weight);
        });
        
        let total = 0;
        let path = [];
        
        for (const facility of facilities) {
            const overflow = facility.value * 0.44;
            while (total + facility.value < remaining || 
                total + facility.value <= remaining + overflow ||
                total + facility.value <= remaining - overflow
                ) {
                path.push(facility.name);
                total += facility.value;

                if (total + facility.value > remaining + overflow) {
                    break;
                }
            }
        }

        if (total == 0) {
            const last = facilities[facilities.length-1];
            path.push(last.name);
            total += last.value;
        }


        return {
            path: path,
            total: total >= remaining ? total : remaining
        };
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

export { FishCalculator, FlowerCalculator, GolfCalculator, RacingCalculator, SuitsCalculator };
