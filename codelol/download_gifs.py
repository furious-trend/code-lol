import urllib.request
import re
import os

def download_gifs(directory):
    readme_path = os.path.join(directory, 'README.md')
    if not os.path.exists(readme_path):
        return
        
    with open(readme_path, 'r') as f:
        content = f.read()
        
    urls = re.findall(r'(https?://\S+\.gif)', content)
    
    for i, url in enumerate(urls):
        filename = f"{os.path.basename(directory)}_{i}.gif"
        filepath = os.path.join(directory, filename)
        print(f"Downloading {url} to {filepath}")
        try:
            urllib.request.urlretrieve(url, filepath)
        except Exception as e:
            print(f"Failed to download {url}: {e}")

download_gifs('public/gifs/happy')
download_gifs('public/gifs/roasting')
