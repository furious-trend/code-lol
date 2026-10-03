import os
import glob

def fix_patterns(directory):
    files = glob.glob(os.path.join(directory, "*.ts"))
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We want to replace 'pattern: "^[a-zA-Z_]\\\\w*\\\\s*="'
        # with 'pattern: "[a-zA-Z_]\\\\w*\\\\s*="'
        content = content.replace('pattern: "^[a-zA-Z_]\\\\w*\\\\s*="', 'pattern: "[a-zA-Z_]\\\\w*\\\\s*="')
        
        # We also want to replace 'pattern: "^(let|const|var)'
        # with 'pattern: "(let|const|var)'
        content = content.replace('pattern: "^(let|const|var)', 'pattern: "(let|const|var)')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

fix_patterns('/home/shafi/projects/code lol/codelol/lib/lessons')
