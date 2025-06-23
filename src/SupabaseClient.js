import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qacizfsxcsxsgpzdjryn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY2l6ZnN4Y3N4c2dwemRqcnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjMyMjksImV4cCI6MjA2MDYzOTIyOX0.PLeELMKXe1E6T0xdgs2647HnFz3qPa1wlPcvWUWCMJo";
export const supabase = createClient(supabaseUrl, supabaseKey);
