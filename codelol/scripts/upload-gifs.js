require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // MUST use service role key to bypass RLS

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  }
});

const GIF_DIR = path.join(__dirname, '../public/gifs');
const BUCKET_NAME = 'gifs';

async function uploadDirectory(directory, baseDir) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await uploadDirectory(fullPath, baseDir);
    } else if (file.endsWith('.gif')) {
      const relativePath = path.relative(baseDir, fullPath);
      // Replace backslashes with forward slashes for Supabase storage paths
      const storagePath = relativePath.split(path.sep).join('/');
      
      const fileBuffer = fs.readFileSync(fullPath);
      
      console.log(`Uploading ${storagePath}...`);
      
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/gif',
          upsert: true
        });
        
      if (error) {
        console.error(`Failed to upload ${storagePath}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${storagePath}`);
      }
    }
  }
}

async function main() {
  console.log(`Ensuring bucket '${BUCKET_NAME}' exists...`);
  // Attempt to create the bucket if it doesn't exist (public bucket)
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.find(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    if (error) {
      console.error(`Failed to create bucket ${BUCKET_NAME}:`, error.message);
    } else {
      console.log(`Created public bucket '${BUCKET_NAME}'.`);
    }
  } else {
      console.log(`Bucket '${BUCKET_NAME}' already exists.`);
  }

  console.log('Starting upload...');
  await uploadDirectory(GIF_DIR, GIF_DIR);
  console.log('Done!');
}

main().catch(console.error);
