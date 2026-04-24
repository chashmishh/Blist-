# B4I DIE

A minimalist bucket list web app — things you want to do, places you want to go, before you die.

Built as a multi-page static site with **Vite**, backed by **Supabase** (Auth + Postgres) and deployed on **Netlify**.

---

## What it does

- Add bucket list items with a name and optional location
- Mark items as done
- Your list is private — only you can see it (syncs across devices)

---

## Tech stack

- Vite (multi-page build)
- HTML + Tailwind CSS (CDN)
- [Supabase](https://supabase.com) — Auth + Postgres + RLS
- [Netlify](https://netlify.com) — hosting + CI deploys from GitHub

---

## Pages

- `index.html`: login
- `app.html`: all items
- `done.html`: done items

---

## Project structure

```
/
├── index.html
├── app.html
├── done.html
├── supabase.js         # Supabase client (env-based)
├── auth.js             # Login / logout actions
├── auth-guard.js       # Redirects to login when signed out
├── public/_redirects   # Netlify redirects (copied into dist/)
└── netlify.toml        # Netlify build settings
```

---

## Supabase setup

Create a Supabase project, then run this in the SQL editor:

```sql
create table bucket_list (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  location text,
  done boolean default false,
  created_at timestamp default now()
);

alter table bucket_list enable row level security;

create policy "Users can manage their own items"
on bucket_list
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

---

## Environment variables

This app reads Supabase credentials from environment variables (via Vite).

### Local

Create `.env` (don’t commit it):

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

You can find these in Supabase under **Project Settings → API**.

### Netlify

In Netlify → **Site settings → Environment variables**, set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Run locally

```bash
npm install
npm run dev
```

---

## Deploy (Netlify)

The repo includes `netlify.toml`:

- build command: `npm run build`
- publish directory: `dist`

Netlify will build and publish all pages (`/`, `/app.html`, `/done.html`).

---

## Public repo checklist

- Do **not** commit `.env` files
- Do **not** commit Supabase **service role** keys (never needed for this frontend)
- Keep **RLS enabled** on `bucket_list`

---

## License

Do whatever you want with it.
