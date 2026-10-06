const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.brxautcammfkxupmweyc:shafiqmaadheshadhi@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    
    await client.query(`
      ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_learning_language_check;
    `);
    console.log("Dropped check constraint.");
    
    await client.query(`
      ALTER TABLE public.profiles ADD CONSTRAINT profiles_learning_language_check CHECK (learning_language IN ('javascript', 'python', 'c', 'cpp', 'java'));
    `);
    console.log("Added new constraint.");

  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
