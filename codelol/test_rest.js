const fs = require('fs');
const dotenv = require('dotenv');

const env = dotenv.parse(fs.readFileSync('.env.local'));
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function test() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'test_rest@example.com',
      password: 'password123'
    })
  });
  
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body:', text);
}
test();
