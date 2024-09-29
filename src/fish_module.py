import json

class FishCalculator:
    def __init__(self, rod):
        """
        Initialize the calculator by loading fish and the rod type.
        """
        with open("./data/fish.json", 'r') as file:
            self.fishing_info = json.load(file)

        with open("./data/locations.json", 'r') as file:
            self.location_info = json.load(file)

        with open("./data/caught_fish.json", 'r') as file:
            self.caught = json.load(file)

        self.rod_info = "twig" # default
        self.set_rod(rod)
        self.catchable = self.get_catchable()

    def _get_all_fish_at_location(self, location):
        """
        Finds ALL fish at the desired location.
        If a fish has 'Anywhere' and location, they are added twice.
        If location is a street and a fish has the corresponding playground, they are added again.

        Parameters:
        location (string): The location to get fish from.

        Returns:
        gathered_fish: The fish at location.
        """
        gathered_fish = []
        for fish in self.fishing_info['fish']:
            if location in fish['locations']:
                gathered_fish.append(fish)
            if 'Anywhere' in fish['locations']:
                gathered_fish.append(fish)

            for playground, streets in self.location_info.items(): 
                if location in streets: 
                    if playground in fish['locations']:
                        gathered_fish.append(fish)

        return gathered_fish
    
    def _sort_all_fish_by_rarity(self):
        """
        Sorts ALL fish into a dictionary based on their rarity. Fish may 
        be listed twice if they are available in various locations.

        Returns:
        gathered_fish (dictionary): Fish sorted by rarity. 
        """
        gathered_fish = {i: [] for i in range(1,11)}
        for fish in self.fishing_info['fish']:
            rarity_scale = fish['rarity']
            for location in fish['locations']:
                gathered_fish[rarity_scale].append(fish)
                if rarity_scale < 10: # max fish rarity
                    rarity_scale += 1
        return gathered_fish
    
    def _sort_all_fish_by_location(self):
        """
        Sorts ALL fish into a dictionary based on location. Fish may be listed twice if 
        they are available in various locations.
        
        Returns:
        gathered_fish (dictionary): Fish sorted by location. 
        """
        gathered_fish = {}
        for fish in self.fishing_info['fish']:
            for location in fish['locations']:
                if location not in gathered_fish:
                    gathered_fish[location] = []
                gathered_fish[location].append(fish)
        return gathered_fish

    def set_rod(self, rod):
        """
        Set a new rod.
        """
        self.rod_info = self.fishing_info['rods'][rod]
        self.catchable = self.get_catchable()

    def get_catchable(self):
        """
        Finds all fish that can be caught by the desired rod.

        Returns:
        gathered_fish (list): The fish that can be caught by rod.
        """
        gathered_fish = []
        for fish in self.fishing_info['fish']:
            if fish['weight_min'] <= self.rod_info['weight-max']:
                gathered_fish.append(fish)
        return gathered_fish

    def get_fish_at_location(self, location):
        """
        Finds ALL CATCHABLE fish at the desired location.
        If a fish has 'Anywhere' and location, they are added twice.
        If location is a street and a fish has the corresponding playground, they are added again.

        Parameters:
        location (string): The location to get fish from.

        Returns:
        gathered_fish: The fish at location.
        """
        gathered_fish = []
        for fish in self.catchable:
            if location in fish['locations']:
                gathered_fish.append(fish)
            if 'Anywhere' in fish['locations']:
                gathered_fish.append(fish)

            for playground, streets in self.location_info.items(): 
                if location in streets: 
                    if playground in fish['locations']:
                        gathered_fish.append(fish)

        return gathered_fish

    def sort_fish_by_location(self):
        """
        Sorts ALL CATCHABLE fish into a dictionary based on location. Fish may be listed twice if 
        they are available in various locations.
        
        Returns:
        gathered_fish (dictionary): Catchable fish sorted by location. 
        """
        gathered_fish = {}
        for fish in self.catchable:
            for location in fish['locations']:
                if location not in gathered_fish:
                    gathered_fish[location] = []
                gathered_fish[location].append(fish)
        return gathered_fish
        
    def sort_fish_by_rarity(self):
        """
        Sorts ALL CATCHABLE fish into a dictionary based on their rarity. Fish may 
        be listed twice if they are available in various locations.

        Returns:
        gathered_fish (dictionary): Catchable fish sorted by rarity. 
        """
        gathered_fish = {i: [] for i in range(1,11)}
        for fish in self.catchable:
            rarity_scale = fish['rarity']
            for location in fish['locations']:
                gathered_fish[rarity_scale].append(fish)
                if rarity_scale < 10: # max fish rarity
                    rarity_scale += 1
        return gathered_fish
    
    def sort_best_location(self):
        """
        Sorts all locations by most likely to get new fish.
        To calculate, divide a fish's probability by the amount of fish available in their rarity.
        If a fish has multiple entries, add their divided probabilities together.
        """
        probabilities = {}
        all_locs = self._sort_all_fish_by_location()

        # for fish in all_locs:

        # return best_locals

       
    def sort_best_fish(self):
        """
        Sorts all fish by most likely to get new. 
        """
        probabilities = {}

        for fish in self.catchable:
            rarity_scale = fish['rarity']
            fish_prob = self.rod_info['probability'][rarity_scale-1]

            # get fish in the same rarity and fish in their best pond
            rarity_friends = self.sort_fish_by_rarity()[rarity_scale]
            top_pond = self.get_fish_at_location(fish['locations'][0])
            # remap to just names
            rarity_friends = {fish['name'] for fish in rarity_friends}
            top_pond = {fish['name'] for fish in top_pond}
            # find intersection
            total_fish = rarity_friends & top_pond

            prob = fish_prob / len(total_fish)
            
            if fish['name'] not in probabilities:
                probabilities[fish['name']] = 0

            probabilities[fish['name']] += prob

        sorted_fish = sorted(probabilities.items(), key=lambda item: item[1], reverse=True)
        return sorted_fish
        
