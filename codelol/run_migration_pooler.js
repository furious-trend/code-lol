const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const client = new Client({ connectionString });

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'supabase/migrations/20261001000000_notification_triggers.sql'), 'utf-8');
    await client.connect();
    console.log("Connected to Supabase via Pooler.");
    await client.query(sql);
    console.log("SQL executed successfully!");
  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

run();
