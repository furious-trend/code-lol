import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import SettingsPageClient from "./SettingsPageClient";
import { redirect } from "next/navigation";

export default async function Settings() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // This is a Server Component, so we can't set cookies directly here 
          // without triggering an error if the headers are already sent,
          // but we can pass it for reading.
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const hasEmailIdentity = user.identities?.some(
    (id: { provider: string }) => id.provider === 'email'
  ) ?? false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, humor_preference')
    .eq('id', user.id)
    .single();

  return (
    <SettingsPageClient 
      initialProfile={profile ?? {}} 
      userId={user.id} 
      isPasswordUser={hasEmailIdentity} 
    />
  );
}
