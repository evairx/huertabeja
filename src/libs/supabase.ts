import { createClient, SupabaseClient } from '@supabase/supabase-js'

export function getSupabaseClient(): SupabaseClient {
  const { URL_DB, ANON_KEY } = process.env;
  if (!URL_DB || !ANON_KEY) throw new Error('Missing Supabase environment variables');
  const supabase = createClient(URL_DB, ANON_KEY)
  return supabase
}