import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase project details
const SUPABASE_URL = "https://uzyswntgyvuzapfkmgye.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6eXN3bnRneXZ1emFwZmttZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTU2NjEsImV4cCI6MjA1MDA5MTY2MX0.wOnlgVn9c3J_Wf-HidcPKL-EPPiEnz_61uNan1Ug0Us";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
