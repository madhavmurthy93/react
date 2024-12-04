import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sqbpdmofyvkpqgicyrcr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxYnBkbW9meXZrcHFnaWN5cmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjMwMDgsImV4cCI6MjA0ODY5OTAwOH0.HO8YDSP7UaroU2TxVGv4PtYgkJ7csWRg1QH6uECGMro";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
