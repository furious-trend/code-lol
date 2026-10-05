import os

files = [
    '/home/shafi/projects/code lol/codelol/lib/lessons/interview.ts',
    '/home/shafi/projects/code lol/codelol/lib/lessons/interview-python.ts'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('"tier":"Interview Prep"', '"tier":"Interview"')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched tier in {filepath}")
