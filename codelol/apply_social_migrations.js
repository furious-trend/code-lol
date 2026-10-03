const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  connectionString: 'postgresql://postgres:shafiqmaadheshadhi@db.brxautcammfkxupmweyc.supabase.co:5432/postgres',
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to Supabase.");
    
    const migrations = [
      '20260826140600_init_social.sql',
      '20260827120000_mini_projects.sql',
      '20260930000000_add_social_policies.sql',
      '20261001000000_notification_triggers.sql'
    ];
    
    for (const file of migrations) {
      console.log(`Applying ${file}...`);
      const sql = fs.readFileSync(path.join(__dirname, 'supabase', 'migrations', file), 'utf8');
      await client.query(sql);
      console.log(`Successfully applied ${file}.`);
    }

  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

run();
