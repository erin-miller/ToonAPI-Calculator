import json
from fish_module import FishCalculator

calc = FishCalculator("twig")

print(json.dumps(calc.sort_best_fish(), indent=4))