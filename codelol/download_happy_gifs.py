import urllib.request
import os
import socket

socket.setdefaulttimeout(10)

urls = [
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3N6Njl1bmxqenp6cHFlb2hneGtidXp5NGEyZGx3Z3hodTJuMHljcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cIhfITqRxeTYyqwOuf/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGt6Y29mOXBkdTNzNHJjbjA1Nzc1dnplZHZzMmphMnBmYWMwb3BnayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Sq4MTEey1GkAUW61kT/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjFoaTNzemt2a3hncHEyZ2JrbDBobTY5eWVwZTUzdjBvbm1yOXJydyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/9oFJS0vagT2umxAEC9/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a2d2M2RlbWlpd3BvanphNmc1bWg5Yzdybjd3dDlnYnFnYzJueHMzdyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/xdBCeanNvjJZsSpAIR/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dnA1NTQ1YjM2YmYwNTh1eno4cG5oZDE4dWM3Z3JncGR2MjE4dnI5MyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/qXBz1tBah3NeI0ogWy/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bmRxM3Vqanc0b3ZjZDV0N2J4M294bTFnODJuZmYyMzdyZHd5azBpNyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/oKUHqdb6jczVaASSCU/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2o2MHl4dmNoMHlyeDlpcWFieDgybWtidTJpcmF4M29hbXNmMGVteiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/O8YQGdQapcRvW/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eWRlMjd2ODh6a2FzZzJmc3l1bGdianE2ZDIxazBnZzYxczg3cTB5ciZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/NigQGfGsHJcVx0zXdA/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmRyN2cyY2htMDd3M2tudzIzcDQyd3QxamNsMG9hM3RxN2p3MWpvcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/caZplsPLHBAJ6Ako4K/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aHJvcGJnbGlhNnZ6OHIyYWhkN2NsbTFwaW40c3Fqem0xYXh5N2lzcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EoTyfrbOftaSbBZLPl/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MTBxemF5empubTA2dTlhNHY1Nzhoc3ViaWZnempzdWE1djh6OTg3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5SH84OKBvl3M4pvdrs/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MTBxemF5empubTA2dTlhNHY1Nzhoc3ViaWZnempzdWE1djh6OTg3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XapGZrCFBBjFLx79Ma/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bzJ4c3VxNXFya3Y3aHJnZ3gycTNpb3B2N2YxeXcxemJlNzlxeGpscCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H9XW7maIPjlgpqWpmj/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGIzczh1ZWw2M3UxdHhkeXh2MTlmcXNudjVxeTU3cnZ3YWMwaThidiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H64sgT8N01XxdREde6/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXpxNjlzd29hbHZtenhhYW9oOWI4dGlkNWhpZGo4aWt2MjZ6djNrcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IJpRdpdLwv79RZixOj/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dmFqNWJsMTdlZGhlbmw0dXBwMnpkZXhidjA5eGMxcGhxdHBvbTd5aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DTl6t2Kr0RwcsXl5Uh/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZTNyZ21yeHIybnVjajE1NHRyOXBjZmtobmNzenU0NW5iaXpkZ2V0aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/X4yNzgeDvn0ZtkuYKa/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZjRqYTNkN2Z1cTc3Ym1kM2s3aTg3b3hrdHdvMnZrOXRjYjhpd25lMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SDasxo0fMEurwDzjZ1/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjhsZ200aWVpMWtqM3VoczcybW51ZGFrZTF0ZHR0NzloaTh1aWFzeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/efaBoCOK419A2JavBO/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnl1dGQxemg3NHdoMmFpYzQwb3hwcWY3NGg2Z3gxNTkzMTVraDM3diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8qTDohbG1R0RmtpGfP/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenJ4NWptbnRsdnRnbzZocHUzNHRhYnBrdGdyMmx5MWZxNWNlaXRxbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vPcXNB3UdYw3coqkUo/giphy.gif",
"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZno1b3Y1YzhzbzZqYTFsYXg3ZjVmYjBhMnVtZzE5MXN5N2E1cnpyNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0a4eneb3e3sR8ruSN3/giphy.gif"
]

os.makedirs("public/gifs/tamil/right", exist_ok=True)

for i, url in enumerate(urls):
    filename = f"public/gifs/tamil/right/tamil_happy_{i+1}.gif"
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
