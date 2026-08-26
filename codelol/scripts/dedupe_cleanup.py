import os
import hashlib
import re

def dedupe_readme(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return 0
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    unique_urls = set()
    new_lines = []
    removed_count = 0
    
    for line in lines:
        url_match = re.search(r'https?://\S+\.gif', line)
        if url_match:
            url = url_match.group(0)
            if url in unique_urls:
                removed_count += 1
                continue
            unique_urls.add(url)
        new_lines.append(line)
        
    with open(filepath, 'w') as f:
        f.writelines(new_lines)
        
    return removed_count

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def dedupe_files(directory):
    if not os.path.exists(directory):
        return 0, 0
    
    seen_hashes = set()
    removed_count = 0
    
    files = [f for f in os.listdir(directory) if f.endswith('.gif')]
    initial_count = len(files)
    
    for f in files:
        filepath = os.path.join(directory, f)
        file_hash = md5(filepath)
        if file_hash in seen_hashes:
            os.remove(filepath)
            removed_count += 1
        else:
            seen_hashes.add(file_hash)
            
    final_count = initial_count - removed_count
    return initial_count, final_count

print("Deduping READMEs...")
happy_rm = dedupe_readme('public/gifs/happy/README.md')
roast_rm = dedupe_readme('public/gifs/roasting/README.md')
print(f"Removed {happy_rm} duplicates from happy/README.md")
print(f"Removed {roast_rm} duplicates from roasting/README.md")

print("\nDeduping downloaded GIF files...")
h_init, h_final = dedupe_files('public/gifs/happy')
r_init, r_final = dedupe_files('public/gifs/roasting')
print(f"Happy: {h_init} before -> {h_final} after")
print(f"Roasting: {r_init} before -> {r_final} after")
