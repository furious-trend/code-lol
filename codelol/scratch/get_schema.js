const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:shafiqmaadheshadhi@db.brxautcammfkxupmweyc.supabase.co:5432/postgres',
});

async function run() {
  await client.connect();
  const res = await client.query(`
    SELECT column_name, data_type, character_maximum_length 
    FROM information_schema.columns 
    WHERE table_name = 'battles';
  `);
  console.log(res.rows);
  await client.end();
}
run();
