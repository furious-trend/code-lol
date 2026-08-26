import urllib.request
import re
import os
import uuid
import hashlib

def md5(content):
    hash_md5 = hashlib.md5()
    hash_md5.update(content)
    return hash_md5.hexdigest()

def get_existing_hashes(directory):
    seen_hashes = set()
    if not os.path.exists(directory):
        return seen_hashes
    for f in os.listdir(directory):
        if f.endswith('.gif') or f.endswith('.mp4'):
            filepath = os.path.join(directory, f)
            with open(filepath, 'rb') as fp:
                hash_md5 = hashlib.md5()
                for chunk in iter(lambda: fp.read(4096), b""):
                    hash_md5.update(chunk)
                seen_hashes.add(hash_md5.hexdigest())
    return seen_hashes

def download_gifs(directory):
    readme_path = os.path.join(directory, 'README.md')
    if not os.path.exists(readme_path):
        return
        
    with open(readme_path, 'r') as f:
        content = f.read()
        
    urls = re.findall(r'https?://\S+\.gif', content)
    
    # 1. Dedupe URLs
    unique_urls = list(dict.fromkeys(urls))
    print(f"[{directory}] Found {len(urls)} URLs, {len(unique_urls)} are unique.")
    
    # 2. Get existing hashes
    existing_hashes = get_existing_hashes(directory)
    
    saved = 0
    for url in unique_urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                file_content = response.read()
                
            content_hash = md5(file_content)
            if content_hash in existing_hashes:
                print(f"Skipping {url} (duplicate file content already exists)")
                continue
                
            filename = f"{uuid.uuid4().hex[:8]}.gif"
            filepath = os.path.join(directory, filename)
            
            with open(filepath, 'wb') as out_file:
                out_file.write(file_content)
                
            existing_hashes.add(content_hash)
            saved += 1
            print(f"Downloaded {url} to {filepath}")
            
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            
    print(f"[{directory}] Finished. Downloaded {saved} new unique files.\n")

download_gifs('public/gifs/happy')
download_gifs('public/gifs/roasting')
