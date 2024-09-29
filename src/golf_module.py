import json

class GolfCalculator:
    def __init__(self, data):
        '''
        Initializes the golf calculator.

        data (JSON String): JSON containing the toon's golf progress.
        '''
        with open("./data/golf_trophies.json", 'r') as file:
            self.golf_info = (json.load(file))['trophies']
        
        self.toon = json.loads(data)
        self.toon = {trophy['name']: trophy['num'] for trophy in self.toon}
        
    def get_best_trophy(self):
        trophies = []
        for trophy in self.golf_info:
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
