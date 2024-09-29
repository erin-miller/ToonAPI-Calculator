import fs from 'fs';

export default class SuitsCalculator {
    constructor(data) {
        /**
        Initializes the suits calculator.

        @param {string} data - JSON containing the toon's suits progress.
        */
        this.suits_info = JSON.parse(fs.readFileSync("../data/suits.json", 'utf8'));
        this.toon = JSON.parse(data);
    }

    #getFacilityData(department) {
        /**
        Grabs facility data based off of department.

        @param {string} department - Value in [c,l,m,s]

        Returns: The corresponding department's facility information and values
        */
        const facility = this.suits_info.suitTypes[department].facility;
        return this.suits_info.facilities[facility];
    }

    getBestPath(department) {
        /**
        Returns the optimal facility path to get to promotion.

        @param {string} department - Value in [c,l,m,s]

        @returns {Object[]} - JSON with optimal path and total value
            If toon is maxed or has promotion, it will return with a message.
            If toon does not have a disguise, it will return with a message.
        */
        const facilityInfo = this.#getFacilityData(department);
        const toonInfo = this.toon[department];

        if (toonInfo.hasDisguise) {
            let path = [];
            let total = 0;

            const curr = toonInfo.promotion.current;
            const target = toonInfo.promotion.target;
            const remaining = target - curr;

            if (remaining <= 0) {
                return {
                    path: [],
                    total: 0,
                    message: "The toon has no remaining promotion points needed."
                };
            }

            for (const facility of facilityInfo) {
                const count = Math.floor((remaining - total) / facility.value);
                
                if (count > 0) {
                    total += count * facility.value;
                    // append count times
                    path = path.concat(Array(count).fill(facility.name));
                }
                
                if (total >= remaining) {
                    break;
                }
            }
            
            // ensure remaining is overfilled
            if (total < remaining) {
                const overflow = facilityInfo[facilityInfo.length - 1];
                path.push(overflow.name);
                total += overflow.value;
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
}

