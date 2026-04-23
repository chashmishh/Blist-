import { supabase } from "./supabase.js";

export async function requireAuth({ redirectTo = "login.html" } = {}) {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    window.location.href = redirectTo;
    return;
  }

  if (!data.session) {
    window.location.href = redirectTo;
  }
}

