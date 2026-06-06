import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// #region agent log
fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'pre-fix',hypothesisId:'D',location:'supabase.js:init',message:'supabase client env check',data:{hasUrl:!!supabaseUrl,hasAnonKey:!!supabaseKey,urlLength:supabaseUrl?.length??0},timestamp:Date.now()})}).catch(()=>{});
// #endregion

export const supabase = createClient(supabaseUrl, supabaseKey)
