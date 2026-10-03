import os
import glob

def fix_patterns(directory):
    files = glob.glob(os.path.join(directory, "*.ts"))
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(r'pattern: "^[a-zA-Z_]\\w*\\s*="', r'pattern: "[a-zA-Z_]\\w*\\s*="')
        content = content.replace(r'pattern: "^(let|const|var)', r'pattern: "(let|const|var)')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

fix_patterns('/home/shafi/projects/code lol/codelol/lib/lessons')
