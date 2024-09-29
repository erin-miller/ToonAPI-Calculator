import json

class RacingCalculator:
    def __init__(self, data):
        '''
        Initializes the racing calculator.

        data (JSON String): JSON containing the toon's race progress.
        '''
        with open("./data/race_trophies.json", 'r') as file:
            self.race_info = (json.load(file))['trophies']
        
        self.toon = json.loads(data)
        self.toon = {trophy['name']: trophy['num'] for trophy in self.toon}
        
    def get_best_trophy(self):
        trophies = []
        for trophy in self.race_info:
            count = self.toon.get(trophy['description'])
            for req in trophy['values']:
                if count < req:
                    trophies.append({
                        "name": trophy['description'],
                        "progress": {
                            "current": count,
                            "required": req,
                            "difference": req - count,
                        }

                    })
                    break

        trophies.sort(key=lambda x: x['progress']['difference'])
        return json.dumps(trophies)
