import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { DB_URL, DB_ANON_KEY } from 'astro:env/server';

export function getSupabaseClient(): SupabaseClient {
  if (!DB_URL || !DB_ANON_KEY) throw new Error('Missing Supabase environment variables');
  const supabase = createClient(DB_URL, DB_ANON_KEY)
  return supabase
}