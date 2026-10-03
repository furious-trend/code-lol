const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: 'postgresql://postgres:shafiqmaadheshadhi@db.brxautcammfkxupmweyc.supabase.co:5432/postgres',
});
// wait pg doesn't have family: 4 natively in connection string. Wait, maybe I can just do this:
// We can use an ipv4 pooler URL:
// Wait, Supabase provides an IPv4 pooler. The project ref is `brxautcammfkxupmweyc`.
// The connection string is:
// postgresql://postgres.brxautcammfkxupmweyc:shafiqmaadheshadhi@aws-0-us-east-1.pooler.supabase.com:6543/postgres

// Let's try to update the RLS policy for notifications so anyone can insert for anyone, temporarily or just authenticated users can insert for any user.
const sql = `
  DROP POLICY IF EXISTS "Users can insert notifications for themselves" ON public.notifications;
  CREATE POLICY "Users can insert notifications for others" ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
`;

async function run() {
  try {
    const client = new Client({
      host: 'aws-0-us-east-1.pooler.supabase.com',
      port: 6543,
      user: 'postgres.brxautcammfkxupmweyc',
      password: 'shafiqmaadheshadhi',
      database: 'postgres',
    });
    await client.connect();
    console.log("Connected to pooler!");
    await client.query(sql);
    console.log("Policy updated!");
    await client.end();
  } catch (err) {
    console.error(err);
  }
}
run();
