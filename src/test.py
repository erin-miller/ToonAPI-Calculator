import json
from fish_module import FishCalculator
from golf_module import GolfCalculator
from racing_module import RacingCalculator

calc = RacingCalculator('[{"name":"Speedway Wins","num":4},{"name":"Rural Wins","num":3},{"name":"Urban Wins","num":2},{"name":"Total Wins","num":10},{"name":"Speedway Qualify Count","num":1},{"name":"Rural Qualify Count","num":1000},{"name":"Urban Qualify Count","num":1000},{"name":"Total Qualify Count","num":1000},{"name":"Tournament Race Wins","num":4},{"name":"Tournament Race Qualify Count","num":6},{"name":"Unique race tracks completed","num":10}]')

print(calc.get_best_trophy())