const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  connectionString: 'postgresql://postgres.brxautcammfkxupmweyc:shafiqmaadheshadhi@aws-0-us-east-1.pooler.supabase.com:5432/postgres',
});

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
