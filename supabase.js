import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = 'https://ftulccqzzuznrmcgam.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dWNsY3F6enV6Z25yaG1jZ2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDIwNTUsImV4cCI6MjA5MjUxODA1NX0.WrM7Fv9jLwyEJSBUEw_bQjvX76kpgjtd5EtY7DoAey4'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);