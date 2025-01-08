var rods = {
	Twig: {
		rrf: 3.6,
		weight_max: 4,
		probability: [
			0.3157,
			0.2365,
			0.1709,
			0.1179,
			0.0765,
			0.0455,
			0.0238,
			0.0101,
			0.00279,
			0.000251
		]
	},
	Bamboo: {
		rrf: 3.51,
		weight_max: 8,
		probability: [
			0.3091,
			0.2339,
			0.171,
			0.1195,
			0.0787,
			0.0477,
			0.0255,
			0.0111,
			0.00321,
			0.000309
		]
	},
	Hardwood: {
		rrf: 3.42,
		weight_max: 12,
		probability: [
			0.3029,
			0.2312,
			0.1709,
			0.121,
			0.0809,
			0.0499,
			0.0273,
			0.0122,
			0.00369,
			0.00038
		]
	},
	Steel: {
		rrf: 3.24,
		weight_max: 16,
		probability: [
			0.2892,
			0.2255,
			0.1704,
			0.1238,
			0.0852,
			0.0545,
			0.0311,
			0.0148,
			0.00486,
			0.000576
		]
	},
	Gold: {
		rrf: 3.06,
		weight_max: 20,
		probability: [
			0.2756,
			0.2192,
			0.1695,
			0.1263,
			0.0896,
			0.0593,
			0.0355,
			0.0179,
			0.00639,
			0.000871
		]
	}
};
var fish = [
	{
		name: "Balloon Fish",
		weight_min: 1,
		weight_max: 3,
		rarity: 1,
		locations: [
			"Anywhere"
		]
	},
	{
		name: "Hot Air Balloon Fish",
		weight_min: 1,
		weight_max: 1,
		rarity: 4,
		locations: [
			"Toontown Central",
			"Anywhere"
		]
	},
	{
		name: "Weather Balloon Fish",
		weight_min: 3,
		weight_max: 5,
		rarity: 5,
		locations: [
			"Punchline Place",
			"The Brrrgh"
		]
	},
	{
		name: "Water Balloon Fish",
		weight_min: 3,
		weight_max: 5,
		rarity: 3,
		locations: [
			"Silly Street",
			"Daisy Gardens"
		]
	},
	{
		name: "Red Balloon Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 2,
		locations: [
			"Loopy Lane",
			"Toontown Central"
		]
	},
	{
		name: "Cat Fish",
		weight_min: 2,
		weight_max: 6,
		rarity: 1,
		locations: [
			"Daisy Gardens",
			"Anywhere"
		]
	},
	{
		name: "Siamese Cat Fish",
		weight_min: 2,
		weight_max: 6,
		rarity: 9,
		locations: [
			"Elm Street",
			"Daisy Gardens"
		]
	},
	{
		name: "Alley Cat Fish",
		weight_min: 5,
		weight_max: 11,
		rarity: 4,
		locations: [
			"Lullaby Lane"
		]
	},
	{
		name: "Tabby Cat Fish",
		weight_min: 2,
		weight_max: 6,
		rarity: 3,
		locations: [
			"Daisy Gardens",
			"Estate"
		]
	},
	{
		name: "Tom Cat Fish",
		weight_min: 5,
		weight_max: 11,
		rarity: 2,
		locations: [
			"Donald's Dreamland",
			"Estate"
		]
	},
	{
		name: "Clown Fish",
		weight_min: 2,
		weight_max: 8,
		rarity: 1,
		locations: [
			"Toontown Central",
			"Anywhere"
		]
	},
	{
		name: "Sad Clown Fish",
		weight_min: 2,
		weight_max: 8,
		rarity: 4,
		locations: [
			"Toontown Central",
			"Anywhere"
		]
	},
	{
		name: "Party Clown Fish",
		weight_min: 2,
		weight_max: 8,
		rarity: 2,
		locations: [
			"Toontown Central",
			"Anywhere"
		]
	},
	{
		name: "Circus Clown Fish",
		weight_min: 2,
		weight_max: 8,
		rarity: 6,
		locations: [
			"Toontown Central",
			"Minnie's Melodyland"
		]
	},
	{
		name: "Frozen Fish",
		weight_min: 8,
		weight_max: 12,
		rarity: 1,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Star Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 1,
		locations: [
			"Anywhere"
		]
	},
	{
		name: "Five Star Fish",
		weight_min: 2,
		weight_max: 6,
		rarity: 2,
		locations: [
			"Minnie's Melodyland",
			"Anywhere"
		]
	},
	{
		name: "Rock Star Fish",
		weight_min: 5,
		weight_max: 11,
		rarity: 5,
		locations: [
			"Minnie's Melodyland",
			"Anywhere"
		]
	},
	{
		name: "Shining Star Fish",
		weight_min: 4,
		weight_max: 9,
		rarity: 7,
		locations: [
			"Estate",
			"Anywhere"
		]
	},
	{
		name: "All Star Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 10,
		bonus: "Donald's Dock",
		locations: [
			"Toontown Central",
			"Donald's Dock",
			"Estate"
		]
	},
	{
		name: "Holey Mackerel",
		weight_min: 6,
		weight_max: 10,
		rarity: 9,
		locations: [
			"Estate",
			"Toontown Central",
			"Donald's Dock"
		]
	},
	{
		name: "Dog Fish",
		weight_min: 7,
		weight_max: 15,
		rarity: 1,
		locations: [
			"Donald's Dock",
			"Anywhere"
		]
	},
	{
		name: "Bull Dog Fish",
		weight_min: 18,
		weight_max: 20,
		rarity: 6,
		locations: [
			"Donald's Dock",
			"Estate"
		]
	},
	{
		name: "Hot Dog Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 5,
		locations: [
			"Donald's Dock",
			"Estate"
		]
	},
	{
		name: "Dalmatian Dog Fish",
		weight_min: 3,
		weight_max: 7,
		rarity: 4,
		locations: [
			"Donald's Dock",
			"Estate"
		]
	},
	{
		name: "Puppy Dog Fish",
		weight_min: 1,
		weight_max: 2,
		rarity: 2,
		locations: [
			"Donald's Dock",
			"Anywhere"
		]
	},
	{
		name: "Amore Eel",
		weight_min: 2,
		weight_max: 6,
		rarity: 1,
		locations: [
			"Daisy Gardens",
			"Estate",
			"Anywhere"
		]
	},
	{
		name: "Electric Amore Eel",
		weight_min: 2,
		weight_max: 6,
		rarity: 3,
		locations: [
			"Daisy Gardens",
			"Estate"
		]
	},
	{
		name: "Nurse Shark",
		weight_min: 4,
		weight_max: 12,
		rarity: 5,
		locations: [
			"Minnie's Melodyland",
			"Anywhere"
		]
	},
	{
		name: "Clara Nurse Shark",
		weight_min: 4,
		weight_max: 12,
		rarity: 7,
		locations: [
			"Baritone Boulevard",
			"Minnie's Melodyland"
		]
	},
	{
		name: "Florence Nurse Shark",
		weight_min: 4,
		weight_max: 12,
		rarity: 8,
		locations: [
			"Tenor Terrace",
			"Minnie's Melodyland"
		]
	},
	{
		name: "King Crab",
		weight_min: 2,
		weight_max: 4,
		rarity: 3,
		locations: [
			"Donald's Dock",
			"Anywhere"
		]
	},
	{
		name: "Alaskan King Crab",
		weight_min: 5,
		weight_max: 8,
		rarity: 7,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Old King Crab",
		weight_min: 4,
		weight_max: 6,
		rarity: 8,
		locations: [
			"Lighthouse Lane"
		]
	},
	{
		name: "Moon Fish",
		weight_min: 4,
		weight_max: 6,
		rarity: 1,
		locations: [
			"Donald's Dreamland"
		]
	},
	{
		name: "Full Moon Fish",
		weight_min: 14,
		weight_max: 18,
		rarity: 10,
		bonus: "Donald's Dreamland",
		locations: [
			"Donald's Dreamland"
		]
	},
	{
		name: "Half Moon Fish",
		weight_min: 6,
		weight_max: 10,
		rarity: 8,
		locations: [
			"Lullaby Lane"
		]
	},
	{
		name: "New Moon Fish",
		weight_min: 1,
		weight_max: 1,
		rarity: 3,
		locations: [
			"Donald's Dreamland"
		]
	},
	{
		name: "Crescent Moon Fish",
		weight_min: 2,
		weight_max: 6,
		rarity: 6,
		locations: [
			"Lullaby Lane"
		]
	},
	{
		name: "Harvest Moon Fish",
		weight_min: 10,
		weight_max: 14,
		rarity: 4,
		locations: [
			"Donald's Dreamland",
			"Daisy Gardens"
		]
	},
	{
		name: "Sea Horse",
		weight_min: 12,
		weight_max: 16,
		rarity: 2,
		locations: [
			"Estate",
			"Daisy Gardens",
			"Anywhere"
		]
	},
	{
		name: "Rocking Sea Horse",
		weight_min: 14,
		weight_max: 18,
		rarity: 3,
		locations: [
			"Estate",
			"Daisy Gardens",
			"Anywhere"
		]
	},
	{
		name: "Clydesdale Sea Horse",
		weight_min: 14,
		weight_max: 20,
		rarity: 5,
		locations: [
			"Estate",
			"Daisy Gardens"
		]
	},
	{
		name: "Arabian Sea Horse",
		weight_min: 14,
		weight_max: 20,
		rarity: 7,
		locations: [
			"Estate",
			"Daisy Gardens"
		]
	},
	{
		name: "Pool Shark",
		weight_min: 9,
		weight_max: 11,
		rarity: 3,
		locations: [
			"Anywhere"
		]
	},
	{
		name: "Kiddie Pool Shark",
		weight_min: 8,
		weight_max: 12,
		rarity: 5,
		locations: [
			"Daisy Gardens",
			"Donald's Dock"
		]
	},
	{
		name: "Swimming Pool Shark",
		weight_min: 8,
		weight_max: 12,
		rarity: 6,
		locations: [
			"Daisy Gardens",
			"Donald's Dock"
		]
	},
	{
		name: "Olympic Pool Shark",
		weight_min: 8,
		weight_max: 16,
		rarity: 7,
		locations: [
			"Daisy Gardens",
			"Donald's Dock"
		]
	},
	{
		name: "Brown Bear Acuda",
		weight_min: 10,
		weight_max: 18,
		rarity: 2,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Black Bear Acuda",
		weight_min: 10,
		weight_max: 18,
		rarity: 3,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Koala Bear Acuda",
		weight_min: 10,
		weight_max: 18,
		rarity: 4,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Honey Bear Acuda",
		weight_min: 10,
		weight_max: 18,
		rarity: 5,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Polar Bear Acuda",
		weight_min: 12,
		weight_max: 20,
		rarity: 6,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Panda Bear Acuda",
		weight_min: 14,
		weight_max: 20,
		rarity: 7,
		locations: [
			"The Brrrgh"
		]
	},
	{
		name: "Kodiac Bear Acuda",
		weight_min: 14,
		weight_max: 20,
		rarity: 8,
		locations: [
			"Sleet Street",
			"The Brrrgh"
		]
	},
	{
		name: "Grizzly Bear Acuda",
		weight_min: 16,
		weight_max: 20,
		rarity: 10,
		bonus: "Walrus Way",
		locations: [
			"The Brrrgh",
			"Walrus Way"
		]
	},
	{
		name: "Cutthroat Trout",
		weight_min: 2,
		weight_max: 10,
		rarity: 2,
		locations: [
			"Donald's Dock",
			"Anywhere"
		]
	},
	{
		name: "Captain Cutthroat Trout",
		weight_min: 4,
		weight_max: 10,
		rarity: 6,
		locations: [
			"Barnacle Boulevard",
			"Donald's Dock"
		]
	},
	{
		name: "Scurvy Cutthroat Trout",
		weight_min: 4,
		weight_max: 10,
		rarity: 7,
		locations: [
			"Seaweed Street",
			"Donald's Dock"
		]
	},
	{
		name: "Piano Tuna",
		weight_min: 13,
		weight_max: 17,
		rarity: 5,
		locations: [
			"Minnie's Melodyland",
			"Anywhere"
		]
	},
	{
		name: "Grand Piano Tuna",
		weight_min: 16,
		weight_max: 20,
		rarity: 10,
		bonus: "Alto Avenue",
		locations: [
			"Minnie's Melodyland",
			"Alto Avenue"
		]
	},
	{
		name: "Baby Grand Piano Tuna",
		weight_min: 12,
		weight_max: 18,
		rarity: 9,
		locations: [
			"Tenor Terrace",
			"Minnie's Melodyland"
		]
	},
	{
		name: "Upright Piano Tuna",
		weight_min: 12,
		weight_max: 18,
		rarity: 6,
		locations: [
			"Minnie's Melodyland"
		]
	},
	{
		name: "Player Piano Tuna",
		weight_min: 12,
		weight_max: 18,
		rarity: 7,
		locations: [
			"Minnie's Melodyland"
		]
	},
	{
		name: "Peanut Butter & Jellyfish",
		weight_min: 1,
		weight_max: 5,
		rarity: 2,
		locations: [
			"Toontown Central",
			"Estate",
			"Anywhere"
		]
	},
	{
		name: "Grape PB&J Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 3,
		locations: [
			"The Brrrgh",
			"Estate",
			"Anywhere"
		]
	},
	{
		name: "Crunchy PB&J Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 4,
		locations: [
			"Daisy Gardens",
			"Estate"
		]
	},
	{
		name: "Strawberry PB&J Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 5,
		locations: [
			"Donald's Dreamland",
			"Estate",
			"Anywhere"
		]
	},
	{
		name: "Concord Grape PB&J Fish",
		weight_min: 1,
		weight_max: 5,
		rarity: 10,
		bonus: "The Brrrgh",
		locations: [
			"The Brrrgh",
			"Donald's Dreamland"
		]
	},
	{
		name: "Devil Ray",
		weight_min: 1,
		weight_max: 20,
		rarity: 9,
		locations: [
			"Donald's Dreamland",
			"Daisy Gardens"
		]
	}
];
var fishData = {
	rods: rods,
	fish: fish
};

var Estate = [
];
var locData = {
	"Toontown Central": [
	"Loopy Lane",
	"Silly Street",
	"Punchline Place"
],
	"Donald's Dock": [
	"Barnacle Boulevard",
	"Lighthouse Lane",
	"Seaweed Street"
],
	"Daisy Gardens": [
	"Elm Street",
	"Maple Street",
	"Oak Street"
],
	"Minnie's Melodyland": [
	"Alto Avenue",
	"Baritone Boulevard",
	"Tenor Terrace"
],
	"The Brrrgh": [
	"Sleet Street",
	"Walrus Way"
],
	"Donald's Dreamland": [
	"Lullaby Lane",
	"Pajama Place"
],
	Estate: Estate
};

class FishCalculator {
    constructor(data) {
        /**
         * Initialize the calculator by loading fish and the rod type.
         * 
         * @param {string} data: Json containing the toon's fish progress.
         */
        this.fishingInfo = fishData;

        this.locationInfo = locData;

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

var flowers = {
	"School Daisy": [
		"yellow"
	],
	"What-in Carnation": [
		"pink"
	],
	"Lily-of-the-Alley": [
		"cyan"
	],
	"Laff-o-dil": [
		"green"
	],
	"Dandy Pansy": [
		"orange"
	],
	"Lazy Daisy": [
		"yellow",
		"red"
	],
	"Instant Carnation": [
		"pink",
		"yellow"
	],
	"Lily Pad": [
		"cyan",
		"green"
	],
	"Daffy Dill": [
		"green",
		"cyan"
	],
	"Chim Pansy": [
		"orange",
		"cyan"
	],
	"Midsummer Daisy": [
		"yellow",
		"red",
		"green"
	],
	"Hybrid Carnation": [
		"pink",
		"red",
		"red"
	],
	"Tiger Lily": [
		"cyan",
		"orange",
		"orange"
	],
	"Potsen Pansy": [
		"orange",
		"red",
		"red"
	],
	"Summer's Last Rose": [
		"red",
		"red",
		"red"
	],
	"Freshasa Daisy": [
		"yellow",
		"red",
		"cyan",
		"orange"
	],
	"Livered Lily": [
		"cyan",
		"orange",
		"orange",
		"pink"
	],
	"Giraff-o-dil": [
		"green",
		"pink",
		"yellow",
		"yellow"
	],
	"Marzi Pansy": [
		"orange",
		"yellow",
		"yellow",
		"red"
	],
	"Corn Rose": [
		"red",
		"yellow",
		"orange",
		"yellow"
	],
	"Whoopsie Daisy": [
		"yellow",
		"red",
		"orange",
		"orange",
		"orange"
	],
	Onelip: [
		"violet",
		"red",
		"blue",
		"violet",
		"violet"
	],
	"Side Carnation": [
		"pink",
		"red",
		"green",
		"blue",
		"red"
	],
	"Chili Lily": [
		"cyan",
		"red",
		"red",
		"red",
		"red"
	],
	"Time and a half-o-dil": [
		"green",
		"pink",
		"blue",
		"pink",
		"pink"
	],
	"Upsy Daisy": [
		"yellow",
		"blue",
		"cyan",
		"violet",
		"blue",
		"blue"
	],
	Twolip: [
		"violet",
		"red",
		"red",
		"red",
		"violet",
		"violet"
	],
	"Silly Lily": [
		"cyan",
		"red",
		"violet",
		"violet",
		"violet",
		"violet"
	],
	"Smarty Pansy": [
		"orange",
		"pink",
		"pink",
		"orange",
		"blue",
		"pink"
	],
	"Tinted Rose": [
		"red",
		"pink",
		"orange",
		"red",
		"orange",
		"pink"
	],
	"Crazy Daisy": [
		"yellow",
		"green",
		"red",
		"orange",
		"green",
		"green",
		"green"
	],
	"Model Carnation": [
		"pink",
		"green",
		"green",
		"green",
		"green",
		"yellow",
		"green"
	],
	"Indubitab Lily": [
		"cyan",
		"violet",
		"cyan",
		"blue",
		"cyan",
		"blue",
		"blue"
	],
	"Car Petunia": [
		"blue",
		"violet",
		"blue",
		"violet",
		"cyan",
		"blue",
		"blue"
	],
	"Stinking Rose": [
		"red",
		"cyan",
		"orange",
		"pink",
		"violet",
		"cyan",
		"cyan"
	],
	"Hazy Dazy": [
		"yellow",
		"blue",
		"violet",
		"cyan",
		"violet",
		"red",
		"orange",
		"violet"
	],
	Threelip: [
		"violet",
		"yellow",
		"yellow",
		"violet",
		"yellow",
		"orange",
		"violet",
		"yellow"
	],
	"Dilly Lilly": [
		"cyan",
		"blue",
		"yellow",
		"yellow",
		"cyan",
		"blue",
		"yellow",
		"yellow"
	],
	Platoonia: [
		"blue",
		"pink",
		"pink",
		"blue",
		"red",
		"orange",
		"yellow",
		"yellow"
	],
	"Istilla Rose": [
		"red",
		"blue",
		"violet",
		"violet",
		"blue",
		"blue",
		"pink",
		"blue"
	]
};
var flowerData = {
	flowers: flowers
};

class FlowerCalculator {
    constructor(data) {
        /**
         * Initializes the flower calculator.
         *
         * @param {string} data: JSON containing the toon's flower progress.
         */
        this.combos = flowerData;

        this.toon = JSON.parse(data);
    }
    
    getCombo(num) {
        return Object.entries(this.combos).filter(([flower, combo]) => combo.length === num);
    }
}

var trophies$1 = [
	{
		description: "Courses Completed",
		values: [
			1,
			10,
			100
		],
		weight: 2
	},
	{
		description: "Courses Under Par",
		values: [
			1,
			10,
			100
		],
		weight: 3
	},
	{
		description: "Hole In One Shots",
		values: [
			1,
			5,
			50
		],
		weight: 4
	},
	{
		description: "Eagle Or Better Shots",
		values: [
			1,
			10,
			100
		],
		weight: 6
	},
	{
		description: "Birdie Or Better Shots",
		values: [
			3,
			30,
			300
		],
		weight: 5
	},
	{
		description: "Par Or Better Shots",
		values: [
			4,
			40,
			400
		],
		weight: 4
	},
	{
		description: "Multiplayer Courses Completed",
		values: [
			2,
			20,
			200
		],
		weight: 3
	},
	{
		description: "Walk In The Par Wins",
		values: [
			1,
			5,
			25
		],
		weight: 2
	},
	{
		description: "Hole Some Fun Wins",
		values: [
			1,
			5,
			25
		],
		weight: 4
	},
	{
		description: "The Hole Kit And Caboodle Wins",
		values: [
			1,
			5,
			25
		],
		weight: 6
	}
];
var golfData = {
	trophies: trophies$1
};

class GolfCalculator {
    constructor(data) {
        /**
         * Initializes the golf calculator.
         *
         * @param {string} data: JSON containing the toon's golf progress.
         */
        this.golf_info = golfData;

        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
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

var trophies = [
	{
		description: "Speedway Wins",
		values: [
			1,
			5,
			25
		],
		weight: 2
	},
	{
		description: "Rural Wins",
		values: [
			1,
			5,
			25
		],
		weight: 4
	},
	{
		description: "Urban Wins",
		values: [
			1,
			5,
			25
		],
		weight: 6
	},
	{
		description: "Total Wins",
		values: [
			50
		],
		weight: 3
	},
	{
		description: "Speedway Qualify Count",
		values: [
			1,
			10,
			50
		],
		weight: 1
	},
	{
		description: "Rural Qualify Count",
		values: [
			1,
			10,
			50
		],
		weight: 2
	},
	{
		description: "Urban Qualify Count",
		values: [
			1,
			10,
			50
		],
		weight: 4
	},
	{
		description: "Total Qualify Count",
		values: [
			100
		],
		weight: 2
	},
	{
		description: "Tournament Race Wins",
		values: [
			5
		],
		weight: 3
	},
	{
		description: "Tournament Race Qualify Count",
		values: [
			1,
			3,
			5,
			7,
			9,
			11,
			13,
			15
		],
		weight: 3
	},
	{
		description: "Unique race tracks completed",
		values: [
			12
		],
		weight: 1
	}
];
var raceData = {
	trophies: trophies
};

class RacingCalculator {
    constructor(data) {
        /**
         * Initializes the racing calculator.
         *
         *@param {string} data: JSON containing the toon's race progress.
         */
        this.race_info = raceData;
        
        this.toon = JSON.parse(data);
        this.toon = Object.fromEntries(this.toon.map(trophy => [trophy.name, trophy.num]));
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

var suitTypes = {
	c: {
		name: "Bossbot",
		facility: "cgc"
	},
	l: {
		name: "Lawbot",
		facility: "wing"
	},
	m: {
		name: "Cashbot",
		facility: "mint"
	},
	s: {
		name: "Sellbot",
		facility: "factory"
	}
};
var facilities = {
	cgc: [
		{
			name: "Final Fringe",
			value: 2200,
			weight: 25.75
		},
		{
			name: "First Fairway",
			value: 940,
			weight: 18.71
		},
		{
			name: "5 story Building",
			value: 290,
			weight: 12.67
		}
	],
	wing: [
		{
			name: "Senior Wing",
			value: 1950,
			weight: 24.17
		},
		{
			name: "Junior Wing",
			value: 810,
			weight: 17.67
		},
		{
			name: "5 story Building",
			value: 280,
			weight: 12.67
		}
	],
	mint: [
		{
			name: "Bullion Mint",
			value: 1750,
			weight: 21.8
		},
		{
			name: "Coin Mint",
			value: 750,
			weight: 16.07
		},
		{
			name: "5 story Building",
			value: 270,
			weight: 12.67
		}
	],
	factory: [
		{
			name: "short Steel Factory",
			value: 905,
			weight: 12.4
		},
		{
			name: "long Scrap Factory",
			value: 600,
			weight: 16.5
		},
		{
			name: "short Scrap Factory",
			value: 350,
			weight: 9.64
		},
		{
			name: "5 story Building",
			value: 270,
			weight: 12.67
		}
	]
};
var suitData = {
	suitTypes: suitTypes,
	facilities: facilities
};

class SuitsCalculator {
    constructor(data) {
        /**
         *Initializes the suits calculator.
         *
         * @param {string} data - JSON containing the toon's suits progress.
         */
        this.suits_info = suitData;

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
//# sourceMappingURL=index.js.map
