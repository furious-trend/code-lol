const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
});

async function run() {
  try {
    await client.connect();
    
    // Check battles table
    const battlesSchema = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'battles';
    `);
    console.log("battles schema:", battlesSchema.rows);
    
    // Remove check constraints from learning_language if any
    await client.query(`
      ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_learning_language_check;
    `);
    console.log("Dropped check constraint on learning_language if it existed.");
    
    // Check if language column exists in battles
    const langCol = battlesSchema.rows.find(r => r.column_name === 'language');
    if (!langCol) {
      await client.query(`
        ALTER TABLE public.battles ADD COLUMN language text DEFAULT 'javascript';
      `);
      console.log("Added language column to battles.");
    }
    
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
