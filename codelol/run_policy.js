const { Client } = require('pg');
const fs = require('fs');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

// Update the RLS policy for notifications so authenticated users can insert
const sql = `
  DROP POLICY IF EXISTS "Users can insert notifications for themselves" ON public.notifications;
  CREATE POLICY "Users can insert notifications for others" ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
`;

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to database!");
    await client.query(sql);
    console.log("Policy updated!");
    await client.end();
  } catch (err) {
    console.error(err);
  }
}
run();
