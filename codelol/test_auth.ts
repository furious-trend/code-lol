import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), 'codelol/.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuth() {
  console.log("Attempting sign up...")
  const { data, error } = await supabase.auth.signUp({
    email: 'test_agent@example.com',
    password: 'password123'
  })
  
  if (error) {
    console.error("SignUp Error:", error.message)
  } else {
    console.log("SignUp Success:", data)
  }
}

testAuth()
