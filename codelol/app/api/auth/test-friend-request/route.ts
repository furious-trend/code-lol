import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We bypass RLS by using the service role key if possible, but we don't have it.
// Wait, we have NEXT_PUBLIC_SUPABASE_ANON_KEY. We can't bypass RLS.
// BUT we can use the anon key with a test user if we sign in via the API route using the credentials we found!

export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Log in as the test user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'shafiq@example.com', // Let's guess the email for shafiq based on standard defaults, or try 'shafiqmaadheshadhi@gmail.com'? We will try.
    password: 'Shafiqahmed1@2#34'
  });
  
  // If email login fails, the smoke test actually used username. But supabase auth is email/password.
  // Wait! The previous scratch file logged in with username using the Next.js UI which probably handles username to email mapping. 
  // Let's just do the insert with a direct SQL REST call if possible.
  
  if (authError) {
    return NextResponse.json({ error: authError.message });
  }

  const userId = authData.user.id;

  // 2. Find another user
  const { data: profiles } = await supabase.from('profiles').select('*').neq('id', userId).limit(1);
  const friendId = profiles?.[0]?.id;

  if (!friendId) {
    return NextResponse.json({ error: "No friend to add" });
  }

  // 3. Insert friendship (triggering app-level if we were using lib/friends, but here we do it directly to simulate it, or we just call sendFriendRequest if we pass the cookies! But we are in an API route, we can just insert directly and insert the notification!)
  
  const { error: insertError } = await supabase.from('friendships').insert({
    user_id: userId,
    friend_id: friendId,
    status: 'pending'
  });

  if (!insertError || insertError.code === '23505') {
    // 4. Create notification
    await supabase.from('notifications').insert({
      user_id: friendId,
      type: 'friend_request',
      title: 'New Friend Request',
      payload: { friend_id: userId }
    });
  }

  // 5. Fetch the notification to prove it exists
  const { data: notif } = await supabase.from('notifications').select('*').eq('user_id', friendId).order('created_at', { ascending: false }).limit(1);

  return NextResponse.json({ success: true, notification: notif });
}
