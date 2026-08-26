import urllib.request
import os
import socket

socket.setdefaulttimeout(10)

urls = [
"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXgwenY3dXlhYXVkOG0zcWR6aGNwZGFleDIwMmhiYTlyYjZoNnkyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N2oM0eoQfDTcwhw3LZ/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dTc2amZ1c2FvMjV3eGNjbWVyajQ1bHg3M2EzY2htbTRwY2lmZ3ZsdCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/yNZyGvSjbs7K26xiR1/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHdhNXo1Mm54Y2p2NWFwbGczcnFhbHhsZDVlYTJjbHNwazE1M3E2OCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/lFAr13wU09oNhOgxLS/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2FzOGU2d2gwcnV6bDJudWZoNWl2d2Zoeml4cnF4ZnYyMmUzYnk3byZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/INXIM5HGHoW9hh4bRa/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aWxudG1naWh1dmR1OXV1bXN1Z2R5YzBybnVnazQxdWdkdzFkOThkbiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/oqb0SO5Yke4wdISxCc/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a2V6bDljMjhhNG9yc3psemI0MHlpZDR2eTUxOGJwbXRjcHgwYXRyayZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/zGGtG4fAC1c3IJnfes/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Yzhobnd4YTdsaDJjbmZpMWFiMDB5N3JuandkcTV4cDhzcTcxeXdzeiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/1jamRrq4faol28Hgyp/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MjUxcDE5NGhsYzRvZ2ZqYXBzdnVzaTFpMzNhcml6dGU3d3JoZXBtdiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/mVuJKVqWNBhKPmPwh7/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dzk1dXFpNWwzOGE0MGRra3puaG9ndTB3dWMxOG9tbHd6MDhjNzd3NCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/r2Fvd6ajs5bFdyISMm/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3U1eDl2bGhyYmtibDFheXEwaWh1enUxbncyNmVtZnpqbjAwYWo5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/f2R4vS8nV0Q7dPy4dB/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZGVweDVweHBrM2Z0eGx2dTcxZDZjbmFkaG1nM2c3NDBhaGo3c3ZyaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VE4M22BIdBSkkqj6KY/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OW9jOTJkYTB3YjZlcHB2Zzd1cmN3MmNxaXh1YmtjN25hZG1id2dxdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SRWraIqwackol1U9ZG/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Mm54ZHh3d2RsNzBrbHRwaHZiOGh6NHd6dm05ZjNsNnh6MjVpYjZiYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/47mVmMerwE2Jc6MqP6/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bmxtZ240bXMxY3J2cGNhcXFnb2Fvb2lnemk5ZzJjaXc5MHhhbnhyNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yxGPQq9xzvjI9z9kDi/giphy.gif"
]

os.makedirs("public/gifs/tamil/wrong", exist_ok=True)

for i, url in enumerate(urls):
    filename = f"public/gifs/tamil/wrong/tamil_roast_{i+1}.gif"
    if os.path.exists(filename) and os.path.getsize(filename) > 0:
        continue
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            with open(filename, "wb") as f:
                f.write(response.read())
        print(f"Downloaded {i+1}")
    except Exception as e:
        print(f"Failed {i+1}: {e}")
