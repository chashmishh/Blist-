import { supabase } from "./supabase.js";

export async function requireAuth({ redirectTo = "index.html" } = {}) {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    window.location.href = redirectTo;
    return;
  }

  if (!data.session) {
    window.location.href = redirectTo;
  }
}

