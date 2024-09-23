import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mamxgycdifpfafbdfgxw.supabase.co"; // Reemplaza con tu URL de Supabase
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hbXhneWNkaWZwZmFmYmRmZ3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NTExODAsImV4cCI6MjA0MjQyNzE4MH0.X38zHsmHIwqEXZMRU3W3XdscdCbpoQG-XwMsvfeD81s"; // Reemplaza con tu anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
