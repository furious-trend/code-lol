import re

with open("codelol/lib/lessons/beginner-python.ts", "r") as f:
    content = f.read()

# 1. Variables - remove let/const from verification
content = content.replace(
    r'"(?:let|const|var)\\s+"', 
    r'"^[a-zA-Z_]\\\\w*\\\\s*="'
).replace(
    r"Use 'let' or 'const'.", 
    r"Use variable assignment."
)

# 2. Typeof
content = content.replace(
    r'"typeof\\s+"', 
    r'"type\\\\("'
).replace(
    r"Try using the 'typeof' operator!",
    r"Try using the 'type()' function!"
)

# 3. Loops
content = content.replace(
    r"for (minutes = 1 minutes <= 5 minutes++) {\n  print('Scrolling reel #' + minutes)\n}",
    r"for minutes in range(1, 6):\n  print('Scrolling reel #' + str(minutes))"
)
content = content.replace(
    r"for (i = 0 i < 3 i++) {\n  print(i)\n}",
    r"for i in range(3):\n  print(i)"
)
content = content.replace(
    r"for (i = 0 i < items.__len__() i++) {\n  print(items[i])\n}",
    r"for item in items:\n  print(item)"
)
content = content.replace(
    r"for (i = 3 i > 0 i--) {\n  print('Countdown:', i)\n}",
    r"for i in range(3, 0, -1):\n  print('Countdown:', i)"
)
content = content.replace(
    r"for (i=0 i<2 i++) {\n  for (j=0 j<2 j++) {\n    print(i, j)\n  }\n}",
    r"for i in range(2):\n  for j in range(2):\n    print(i, j)"
)
content = content.replace(
    r"for (r=0 r<3 r++) {\n  for (c=0 c<3 c++) {\n    grid += '* '\n  }\n  grid += '\\n'\n}",
    r"for r in range(3):\n  for c in range(3):\n    grid += '* '\n  grid += '\\n'"
)
content = content.replace(
    r"for (i=0 i<matrix.__len__() i++) {\n  for (j=0 j<matrix[i].__len__() j++) {\n    print(matrix[i][j])\n  }\n}",
    r"for row in matrix:\n  for col in row:\n    print(col)"
)
content = content.replace(
    r"for (i = 1 i <= 2 i++) {\n  for (j = 1 j <= 2 j++) {\n    print(`i=${i}, j=${j}`)\n  }\n}",
    r"for i in range(1, 3):\n  for j in range(1, 3):\n    print(f'i={i}, j={j}')"
)

# 4. while loop
content = content.replace(
    r"while (!broke && cups < 3) {\n  print('One more chai!')\n  cups++\n}",
    r"while not broke and cups < 3:\n  print('One more chai!')\n  cups += 1"
)
content = content.replace(
    r"while (count < 3) {\n  print(count)\n  count++\n}",
    r"while count < 3:\n  print(count)\n  count += 1"
)
content = content.replace(
    r"while (!ready) {\n  if (++checks > 2) ready = True\n  print('Checking...')\n}",
    r"while not ready:\n  checks += 1\n  if checks > 2: ready = True\n  print('Checking...')"
)
content = content.replace(
    r"x = 10\ndo {\n  print('Ran once!')\n} while (x < 5)",
    r"x = 10\nwhile True:\n  print('Ran once!')\n  if x >= 5: break"
)

# 5. if statements
content = content.replace(
    r"if (isBored) {\n  print('Opening Insta...')\n} else {\n  print('Writing code!')\n}",
    r"if isBored:\n  print('Opening Insta...')\nelse:\n  print('Writing code!')"
)
content = content.replace(
    r"if (5 > 3) {\n  print('Math works!')\n}",
    r"if 5 > 3:\n  print('Math works!')"
)
content = content.replace(
    r"if (rain) print('Umbrella')\nelse print('Sunglasses')",
    r"if rain:\n  print('Umbrella')\nelse:\n  print('Sunglasses')"
)
content = content.replace(
    r"if (score > 90) print('A')\nelse if (score > 80) print('B')\nelse print('C')",
    r"if score > 90:\n  print('A')\nelif score > 80:\n  print('B')\nelse:\n  print('C')"
)
content = content.replace(
    r"if (isHungry) print('Eat!')",
    r"if isHungry:\n  print('Eat!')"
)

# 6. Functions
content = content.replace(
    r"def orderBiryani(isSpicy):\n  if (isSpicy) return '🔥 Spicy Biryani'\n  return 'Normal Biryani'\n}",
    r"def orderBiryani(isSpicy):\n  if isSpicy:\n    return '🔥 Spicy Biryani'\n  return 'Normal Biryani'"
)
content = content.replace(
    r"def sayHi():\n  print('Hi!')\n}\nsayHi()",
    r"def sayHi():\n  print('Hi!')\nsayHi()"
)
content = content.replace(
    r"def add(a, b):\n  return a + b\n}\nprint(add(2, 3))",
    r"def add(a, b):\n  return a + b\nprint(add(2, 3))"
)
content = content.replace(
    r"greet = function(name) {\n  return 'Hello ' + name\n}",
    r"greet = lambda name: 'Hello ' + name"
)

# 7. Switch
content = content.replace(
    r"switch(day) {\n  case 1: print('Monday') break\n  case 3: print('Wednesday') break\n  default: print('Other day')\n}",
    r"match day:\n  case 1:\n    print('Monday')\n  case 3:\n    print('Wednesday')\n  case _:\n    print('Other day')"
)
content = content.replace(
    r"switch(fruit) {\n  case 'Apple': print('Red') break\n  case 'Banana': print('Yellow') break\n}",
    r"match fruit:\n  case 'Apple':\n    print('Red')\n  case 'Banana':\n    print('Yellow')"
)
content = content.replace(
    r"switch(color) {\n  case 'Red': print('Stop') break\n  default: print('Go')\n}",
    r"match color:\n  case 'Red':\n    print('Stop')\n  case _:\n    print('Go')"
)
content = content.replace(
    r"switch(val) {\n  case 1:\n  case 2: print('1 or 2') break\n}",
    r"match val:\n  case 1 | 2:\n    print('1 or 2')"
)
content = content.replace(
    r'"switch\\s*\\("',
    r'"match\\s+"'
).replace(
    r'"Your code runs, but it doesn\'t use a \'switch\' statement."',
    r'"Your code runs, but it doesn\'t use a \'match\' statement."'
)

# 8. Misc logic changes explicitly matching boolean/logical ops
content = re.sub(r"(\w+)\.__len__\(\)", r"len(\1)", content)
content = content.replace(r"print(type(status, type(singles, type(isHappy)", r"print(type(status), type(singles), type(isHappy))")
content = content.replace(r"True && False", r"True and False")
content = content.replace(r"True || False", r"True or False")
content = content.replace(r"!0 && !''", r"not 0 and not ''")
content = content.replace(r"[] && {}", r"[] and {}")

# Ternary
content = content.replace(
    r"result = (marks > 40) ? 'Pass 🎉' : 'Fail 💀'",
    r"result = 'Pass 🎉' if marks > 40 else 'Fail 💀'"
)
content = content.replace(
    r"action = isRaining ? 'Stay inside' : 'Go outside'",
    r"action = 'Stay inside' if isRaining else 'Go outside'"
)
content = content.replace(
    r"print(loggedIn ? 'Welcome!' : 'Please log in')",
    r"print('Welcome!' if loggedIn else 'Please log in')"
)
content = content.replace(
    r"grade = score > 80 ? 'A' : score > 60 ? 'B' : 'C'",
    r"grade = 'A' if score > 80 else ('B' if score > 60 else 'C')"
)

# Array push -> append
content = content.replace(r"cart.append", r"cart.append")
content = content.replace(r"arr.append", r"arr.append")
content = content.replace(r"stack.append", r"stack.append")

# Template literals -> f-strings
content = content.replace(r"`${name} protects ${city}`", r"f'{name} protects {city}'")
content = content.replace(r"`I am ${age} years old`", r"f'I am {age} years old'")
content = content.replace(r"`2 + 2 is ${2 + 2}`", r"f'2 + 2 is {2 + 2}'")

# Truthy / Falsy
content = content.replace(
    r"if ('False') { print('This runs because string is truthy!') }\nif (0) { print('This won\\'t run') }",
    r"if 'False':\n  print('This runs because string is truthy!')\nif 0:\n  print('This won\\'t run')"
)
content = content.replace(
    r"if (!0 && !'') {\n  print('Both are falsy')\n}",
    r"if not 0 and not '':\n  print('Both are falsy')"
)
content = content.replace(
    r"if ([] && {}) {\n  print('Objects and arrays are ALWAYS truthy')\n}",
    r"if [] and {}:\n  print('Objects and arrays are ALWAYS truthy')"
)

# Functions in workout
content = content.replace(
    r"def myHouse():\n  secret = 'Only I know'\n  print(globalGossip)\n}\nmyHouse()",
    r"def myHouse():\n  secret = 'Only I know'\n  print(globalGossip)\nmyHouse()"
)
content = content.replace(
    r"def local():\n  y = 5\n}\n# print(y) # Error! y is not defined",
    r"def local():\n  y = 5\n# print(y) # Error! y is not defined"
)

content = content.replace(
    r"for (i = 3 i > 0 i--) {\n  print(i)\n}",
    r"for i in range(3, 0, -1):\n  print(i)"
)
content = content.replace(
    r"for (i = 3 i > 0 i--) {\n  if (i == 1) {\n    print('Almost there...')\n  }\n  print(i)\n}",
    r"for i in range(3, 0, -1):\n  if i == 1:\n    print('Almost there...')\n  print(i)"
)
content = content.replace(
    r"for (i = 0 i < loot.__len__() i++) {\n  print('Found: ' + loot[i])\n}",
    r"for item in loot:\n  print('Found: ' + item)"
)
content = content.replace(
    r"def attack(base, bonus):\n  return base + bonus\n}",
    r"def attack(base, bonus):\n  return base + bonus"
)
content = content.replace(
    r"def totalDamage(hits):\n  total = 0\n  for(i=0 i<hits.__len__() i++) total += hits[i]\n  return total\n}",
    r"def totalDamage(hits):\n  total = 0\n  for h in hits:\n    total += h\n  return total"
)
content = content.replace(
    r"def greetUser(name):\n  if (!name) return 'Who are you?'\n  return 'Hi ' + name\n}",
    r"def greetUser(name=None):\n  if not name:\n    return 'Who are you?'\n  return 'Hi ' + name"
)
content = content.replace(
    r"def safeAdd(a, b):\n  numA = Number(a) || 0\n  numB = Number(b) || 0\n  return numA + numB\n}",
    r"def safeAdd(a=None, b=None):\n  numA = int(a) if a else 0\n  numB = int(b) if b else 0\n  return numA + numB"
)
content = content.replace(
    r"def battle(p, e):\n  while(p.hp > 0 && e.hp > 0) {\n    e.hp -= 20\n    if (e.hp > 0) p.hp -= 10\n  }\n  return p.hp > 0 ? `${p.name} Wins!` : `${e.name} Wins!`\n}",
    r"def battle(p, e):\n  while p['hp'] > 0 and e['hp'] > 0:\n    e['hp'] -= 20\n    if e['hp'] > 0:\n      p['hp'] -= 10\n  return f\"{p['name']} Wins!\" if p['hp'] > 0 else f\"{e['name']} Wins!\""
)

# Object syntax in battle (JS object to python dict)
content = content.replace(
    r"player = { hp: 100, name: 'Hero' }\nenemy = { hp: 50, name: 'Slime' }",
    r"player = { 'hp': 100, 'name': 'Hero' }\nenemy = { 'hp': 50, 'name': 'Slime' }"
)

# Verification checks replacements
content = content.replace(
    r'"(?:function\\s+|=>)"',
    r'"def\\s+"'
)
content = content.replace(
    r'"for\\s*\\("',
    r'"for\\s+"'
)
content = content.replace(
    r'"while\\s*\\("',
    r'"while\\s+"'
)
content = content.replace(
    r'"if\\s*\\("',
    r'"if\\s+"'
)
content = content.replace(
    r'"\\?.*:"',
    r'"if\\s+.*\\s+else"'
)
content = content.replace(
    r'"\\.push"',
    r'"\\.append"'
)
content = content.replace(
    r"Use .push to add an item to the array.",
    r"Use .append() to add an item to the array."
)

with open("codelol/lib/lessons/beginner-python.ts", "w") as f:
    f.write(content)

