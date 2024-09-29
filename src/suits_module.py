import json

class SuitsCalculator:
    def __init__(self, data):
        '''
        Initializes the suits calculator.

        data (JSON String): JSON containing the toon's suits progress.
        '''
        with open("./data/suits.json", 'r') as file:
            self.suits_info = (json.load(file))
        
        self.toon = json.loads(data)
    
    def _get_facility_data(self, department):
        facility = self.suits_info['suitTypes'][department]['facility']
        return self.suits_info['facilities'][facility]

    def get_best_path(self, department):
        facility_info = self._get_facility_data(department)
        toon_info = self.toon[department]

        if toon_info['hasDisguise']:
            path = []
            total = 0

            curr = toon_info['promotion']['current']
            target = toon_info['promotion']['target']
            remaining = target - curr

            if remaining <= 0:
                return json.dumps({
                    "path": [],
                    "total": 0,
                    "message": "The toon has no remaining promotion points needed."
                })

            for facility in facility_info:
                count = (remaining - total) // facility['value']
                
                if count > 0:
                    total += count * facility['value']
                    # append count times
                    path.extend([facility['name']] * count)
                
                if total >= remaining:
                    break
            
            # ensure remaining is overfilled
            if total < remaining:
                overflow = facility_info[-1]
                path.append(overflow['name'])
                total += overflow['value']
            
            result = {
                "path": path,
                "total": total
            }

            return json.dumps(result)
        else:
            return json.dumps({
                "path": [],
                "total": -1,
                "message": "Toon does not have a disguse."
            })