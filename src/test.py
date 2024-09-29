import json
from fish_module import FishCalculator
from golf_module import GolfCalculator

calc = GolfCalculator('[{"name":"Courses Completed","num":99},{"name":"Courses Under Par","num":50},{"name":"Hole In One Shots","num":7},{"name":"Eagle Or Better Shots","num":120},{"name":"Birdie Or Better Shots","num":400},{"name":"Par Or Better Shots","num":1},{"name":"Multiplayer Courses Completed","num":200},{"name":"Walk In The Par Wins","num":24},{"name":"Hole Some Fun Wins","num":10},{"name":"The Hole Kit And Caboodle Wins","num":1}]')

print(calc.get_best_trophy())