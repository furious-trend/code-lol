import fetch from 'node-fetch';

async function run() {
  const res = await fetch('https://api.onlinecompiler.io/api/run-code-sync/', {
    method: 'POST',
    headers: {
      'Authorization': 'ae439b5a87ec03f87399e4d0575aa54d',
      'Content-Type': 'application/json',
      // 'User-Agent': 'curl/8.5.0' // uncomment if needed
    },
    body: JSON.stringify({ compiler: 'python-3.14', code: 'print("Hello Node Fetch")' })
  });

  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Body:', text);
}

run();
