import os
import glob
import re

lessons_dir = '/home/shafi/projects/code lol/codelol/lib/lessons'

for filepath in glob.glob(os.path.join(lessons_dir, '*.ts')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    patched = False
    
    for line in lines:
        if '"id":' in line and 'gifKeyword' not in line:
            # Check if it ends with }},
            if line.endswith('}},'):
                line = line[:-3] + '},"gifKeyword":"success meme"},'
                patched = True
            elif line.endswith('}}'):
                line = line[:-2] + '},"gifKeyword":"success meme"}'
                patched = True
        new_lines.append(line)
        
    if patched:
        new_content = '\n'.join(new_lines)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched {os.path.basename(filepath)}")
