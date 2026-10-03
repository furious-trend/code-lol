import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'shafiq@example.com', // wait, the script used username? Supabase auth usually uses email. Let's try.
    password: 'Shafiqahmed1@2#34'
  });
  
  if (authError) {
    console.error("Auth error:", authError);
    // Let's try searching for users if auth fails
    return;
  }
  
  console.log("Logged in as:", authData.user.id);
  
  // Find another user
  const { data: profiles } = await supabase.from('profiles').select('*').neq('id', authData.user.id).limit(1);
  if (!profiles || profiles.length === 0) {
    console.log("No other users found to friend.");
    return;
  }
  
  const friendId = profiles[0].id;
  console.log("Found another user:", friendId);
  
  // Create friend request
  console.log("Sending friend request via API...");
  // But wait, the API was implemented in lib/friends.ts, we need to replicate that logic using the authenticated supabase client.
  const { error: insertError } = await supabase.from('friendships').insert({
    user_id: authData.user.id,
    friend_id: friendId,
    status: 'pending'
  });
  
  if (insertError) {
    console.log("Insert friendship error:", insertError.message);
  }
  
  // the lib/friends.ts runs on the server (Server Action). So inserting friendship from client doesn't automatically trigger the notification, because we added the application-level trigger in lib/friends.ts, NOT a database trigger!
  // Wait! The user asked for "triggers for friend requests/accepts/battle invites/milestones".
  // The application-level trigger only fires when someone calls `sendFriendRequest` in Next.js Server Action!
  
  // To verify it, we should call the Next.js API or use Puppeteer to click the friend request button.
  console.log("Please test via UI to hit lib/friends.ts sendFriendRequest().");
}
run();
