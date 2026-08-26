import urllib.request
import os

general_sounds = [
    "https://www.myinstants.com/media/sounds/faaah.mp3",
    "https://www.myinstants.com/media/sounds/896756048.mp3",
    "https://www.myinstants.com/media/sounds/tf_nemesis.mp3",
    "https://www.myinstants.com/media/sounds/directed-by-robert-b_voI2Z4T.mp3",
    "https://www.myinstants.com/media/sounds/dexter-meme.mp3",
    "https://www.myinstants.com/media/sounds/faaaaaaaaaaaaaaaaaah.mp3",
    "https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3",
    "https://www.myinstants.com/media/sounds/indian-song.mp3",
    "https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3",
    "https://www.myinstants.com/media/sounds/happy-happy-happy-song.mp3",
    "https://www.myinstants.com/media/sounds/let-her-go.mp3",
    "https://www.myinstants.com/media/sounds/level-up-super-mario.mp3"
]

tamil_sounds = [
    "https://www.myinstants.com/media/sounds/seeman-buhaha.mp3",
    "https://www.myinstants.com/media/sounds/nov-thappa-irrkuthu-naa.mp3",
    "https://www.myinstants.com/media/sounds/thambi-keela-erangu-pa.mp3",
    "https://www.myinstants.com/media/sounds/aiyo-apdi-chollatha.mp3"
]

os.makedirs("public/sounds/general", exist_ok=True)
os.makedirs("public/sounds/tamil", exist_ok=True)

def download_list(urls, folder):
    for url in urls:
        filename = os.path.join(folder, url.split("/")[-1])
        if os.path.exists(filename):
            continue
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                with open(filename, "wb") as f:
                    f.write(response.read())
            print(f"Downloaded {filename}")
        except Exception as e:
            print(f"Failed {filename}: {e}")

download_list(general_sounds, "public/sounds/general")
download_list(tamil_sounds, "public/sounds/tamil")
