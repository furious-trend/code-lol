import os

file_path = "app/api/roast/route.ts"
if not os.path.exists(file_path):
    print("File not found")
    exit(1)

with open(file_path, "r") as f:
    content = f.read()

old_prompt = """Example of GOOD roast: 'Forgot a semicolon — classic case of ordering food and forgetting to pay.'
Example of BAD roast (too long/confusing, do not do this): 'You're baking a cake without flour, you know, like when Cookie Monster made a mess in that one episode...'`;"""

new_prompt = """Example of GOOD roast: 'Forgot a semicolon — classic case of ordering food and forgetting to pay.'
Example of BAD roast (too long/confusing, do not do this): 'You're baking a cake without flour, you know, like when Cookie Monster made a mess in that one episode...'

If the code is empty, contains no real code, or has errors too severe to identify a specific bug, do NOT write a flat statement like 'you forgot to compile' or 'this code doesn't work.' Instead, write a punchy joke that exaggerates HOW broken it is, using a relatable comparison. 

Examples of GOOD broken-code roasts:
- 'Your code has more red squiggly lines than a school essay written 5 minutes before submission.'
- 'I searched for a bug but found an entire crime scene instead.'
- 'This isn't a syntax error, this is a cry for help.'
- 'Even autocomplete gave up halfway through reading this.'

Examples of BAD broken-code roasts (do not do this):
- 'You forgot to compile your code.'
- 'This code has an error.'
- 'Please check your syntax.'

The roast must still be ONE sentence, under 20 words, funny on its own without needing the code shown alongside it.`;"""

if old_prompt in content:
    content = content.replace(old_prompt, new_prompt)
    with open(file_path, "w") as f:
        f.write(content)
    print("Updated prompt in route.ts")
else:
    print("Could not find the old prompt string in route.ts")
