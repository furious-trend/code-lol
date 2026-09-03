import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://brxautcammfkxupmweyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeGF1dGNhbW1ma3h1cG13ZXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NzU5MjksImV4cCI6MjEwMTA1MTkyOX0.9bLPvrn0dsd0FQ25I2erowkIGl5eAwq74v056m44iK0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
  const { data, error } = await supabase
    .storage
    .from('assets')
    .upload('test.txt', 'Hello world');
  
  if (error) {
    console.error('Upload error:', error.message);
  } else {
    console.log('Upload success:', data);
  }
}

testUpload();
