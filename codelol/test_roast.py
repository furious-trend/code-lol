import urllib.request
import urllib.error
import json
import time

tests = [
    {
        "name": "Test 1: Empty Code",
        "payload": {"code":" ","output":"SyntaxError: Unexpected end of input","isSuccess":False}
    },
    {
        "name": "Test 2: Gibberish text",
        "payload": {"code":"akjsdhflakjshfdlkjahsdf kjhaskjdhf kjasdhf","output":"SyntaxError: Unexpected identifier","isSuccess":False}
    },
    {
        "name": "Test 3: Stacked syntax errors",
        "payload": {"code":"def func() { if } == { return ( ] ; }","output":"SyntaxError: Unexpected token","isSuccess":False}
    }
]

url = "http://localhost:3000/api/roast"

for test in tests:
    print(f"\n{test['name']}")
    data = json.dumps(test['payload']).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("ROAST:", result.get('roast', result))
    except Exception as e:
        print("ERROR:", e)
