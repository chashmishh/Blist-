import { supabase } from "./supabase.js";

const $ = (id) => document.getElementById(id);

const form = $("login-form");
const emailInput = $("email");
const passwordInput = $("password");
const statusEl = $("status");
const logoutBtn = $("logout");

function setStatus(message, type = "info") {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.type = type;
}

async function redirectIfLoggedIn() {
  const { data } = await supabase.auth.getSession();
  if (data.session) window.location.href = "app.html";
}

async function handlePasswordLogin(event) {
  event.preventDefault();
  const email = (emailInput?.value || "").trim();
  const password = passwordInput?.value || "";

  if (!email || !password) {
    setStatus("Enter email + password.", "error");
    return;
  }

  setStatus("Signing in…");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setStatus(error.message, "error");
    return;
  }

  setStatus("Signed in. Redirecting…", "success");
  window.location.href = "app.html";
}

async function handleLogout() {
  setStatus("Signing out…");
  const { error } = await supabase.auth.signOut();
  if (error) setStatus(error.message, "error");
  else setStatus("Signed out.", "success");
}

if (form) form.addEventListener("submit", handlePasswordLogin);
if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

redirectIfLoggedIn();
