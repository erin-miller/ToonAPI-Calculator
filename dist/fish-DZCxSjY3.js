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
var fish$1 = {
	rods: rods,
	fish: fish
};

export { fish$1 as default, fish, rods };
//# sourceMappingURL=fish-DZCxSjY3.js.map
