const http = require('http');

const data = JSON.stringify({
  code: 'console.log("hello");',
  output: 'hello',
  isSuccess: true,
  humorPref: 'tamil'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/roast',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});

req.on('error', console.error);
req.write(data);
req.end();
