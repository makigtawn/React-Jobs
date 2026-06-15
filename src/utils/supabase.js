import { createClient } from "@supabase/supabase-js";

// Use process.env for Node.js backends
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and anon key are required");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
