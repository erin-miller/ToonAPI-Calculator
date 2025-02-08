import flowerCombos from "../data/flowers_combos.json" assert { type: "json" };
import gardenData from "../data/flowers.json" assert { type: "json" };

export default class FlowerCalculator {
  constructor(data) {
    /**
     * Initializes the flower calculator.
     *
     * @param {string} data: JSON containing the toon's flower progress.
     */
    this.combos = flowerCombos.flowers;
    this.tiers = gardenData.flowers;
    this.shovels = gardenData.shovels;
    this.toon = JSON.parse(data);
  }

  getCombo(num) {
    /**
     * Returns all flowers with num length combo
     *
     * @param {int} num of the jellybean combo
     * @returns array of flowers with num combos
     */
    return Object.entries(this.combos).filter(
      ([flower, combo]) => combo.length === num
    );
  }

  getWateringCan() {
    /**
     * @return the watering can name, current skill, and max skill
     */
    return [
      this.toon.wateringCan.name,
      this.toon.wateringCan.curSkill,
      this.toon.wateringCan.maxSkill,
    ];
  }

  getShovel() {
    /**
     * @return the shovel name, current skill, and max skill
     */
    return [
      this.toon.shovel.name,
      this.toon.shovel.curSkill,
      this.toon.shovel.maxSkill,
    ];
  }

  getProgressFlowers() {
    /**
     * Finds all flowers that match the toon's highest jellybean combo level
     * @return Flowers in the highest jellybean combo level
     */

    const maxCombo = this.getComboLevel();

    return Object.fromEntries(
        Object.entries(this.combos).filter(([name, combo]) => combo.length === maxCombo)
    );
}

  getMissingFlowers() {
    /**
     * Finds the toon's missing flowers, including ones they can't plant
     * @return all missing flower combos
     */
    const earned = new Set(
      this.getEarnedFlowers().map((flower) => flower.name)
    );

    return Object.fromEntries(
      Object.entries(this.combos).filter(
        ([flowerName]) => !earned.has(flowerName)
      )
    );
  }

  getNewFlowers() {
    /**
     * Finds the toon's missing flowers that can still be planted
     * @return Missing flowers and their combos that the toon can plant
     */

    const missing = this.getMissingFlowers();
    const maxCombo = this.getComboLevel();

    return Object.fromEntries(
      Object.entries(missing).filter(
        ([name, combo]) => combo.length <= maxCombo
      )
    );
  }

  getDaysToUpgrade() {
    /**
     * Finds the days until the next shovel skill upgrade
     * @return {number | null} Days until next skill upgrade (null if maxed)
     */

    const { name: shovelName, curSkill } = this.toon.shovel;

    // find next tier in this shovel
    let threshold = null;

    for (const tier of this.shovels[shovelName]) {
      if (curSkill < tier.points_max) {
        threshold = tier.points_max;
        break;
      }
    }

    // If no next threshold in the current shovel, check the next shovel
    if (threshold === null) {
      const shovelNames = Object.keys(this.shovels);
      const curr = shovelNames.indexOf(shovelName);

      if (curr < shovelNames.length - 1) {
        const nextShovel = this.shovels[shovelNames[curr + 1]];
        threshold = nextShovel[0].points_min; // First tier of the next shovel
      }
    }

    if (threshold !== null) {
      const pts = threshold - curSkill;
      return pts > 0 ? Math.ceil(pts / 10) : 0;
    }

    return null; // Maxed out
  }

  getComboLevel() {
    /**
     * Determines the maximum jellybean combo level the toon can plant
     * @return {number} Max jellybean combo level
     */

    const { name: shovelName, curSkill } = this.toon.shovel;

    // Find the max jellybeans the toon can plant
    let lvl = 0;
    if (this.shovels[shovelName]) {
      for (const tier of this.shovels[shovelName]) {
        if (curSkill >= tier.points_min && curSkill <= tier.points_max) {
          lvl = tier.jellybeans;
          break; // Stop after finding the correct tier
        }
      }
    }

    return lvl;
  }

  getPlantableFlowers() {
    /**
     * Determines the flower combos that this toon can plant
     * @return plantable flowers
     */
    const maxCombo = this.getComboLevel();

    // Get all flowers that match the max jellybean count
    const plantable = Object.entries(this.combos)
      .filter(([flower, combo]) => combo.length <= maxCombo) // Check combo length
      .map(([flower, combo]) => ({ name: flower, combo })); // Format output

    return plantable;
  }

  getEarnedFlowers() {
    /**
     * Finds the toon's planted flowers
     * @return all current earned flowers
     */
    const flowers = [];

    for (const id in this.toon.collection) {
      const flower = this.toon.collection[id];
      Object.entries(flower.album).forEach((combo) => {
        if (this.combos[combo[1]]) {
          flowers.push({ name: combo[1], combo: this.combos[combo[1]] });
        }
      });
    }

    return flowers;
  }
}
