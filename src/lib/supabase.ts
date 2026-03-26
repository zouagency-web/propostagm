import { createClient, SupabaseClient } from "@supabase/supabase-js";

function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || !url.startsWith("https://")) {
    // Return a client with a dummy URL for build time
    return createClient("https://placeholder.supabase.co", "placeholder-key");
  }

  return createClient(url, key);
}

export const supabase = getSupabaseClient();
