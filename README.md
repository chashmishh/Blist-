# B41 DIE

A minimal desktop web app to track your bucket list — things you want to do, places you want to go, before you die.

Live at **[b4idie.netlify.app](https://b4idie.netlify.app)**

---

## What it does

- Add bucket list items with a name and optional location
- Mark items as done
- Your list is private — only you can see it, from any device

---

## Tech stack

- Plain HTML, CSS, Tailwind CSS (CDN)
- [Supabase](https://supabase.com) — database + authentication
- Hosted on [Netlify](https://netlify.com), deployed from GitHub

---

## Project structure

```
/
├── index.html      # Login / sign up page
├── list.html       # Main bucket list view
└── done.html       # Completed items view
```

---

## Setup (if running locally or forking)

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, then run this in the SQL editor:

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

### 2. Add your Supabase credentials

In each HTML file, find this block near the top and replace the placeholder values:

```js
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co'
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY'
```

Your credentials are in Supabase under **Project Settings → API**.

> The anon key is safe to include in frontend code. Data security is handled by Supabase Row Level Security (RLS), not the key itself.

### 3. Deploy

Push to GitHub. If your repo is connected to Netlify, it will auto-deploy on every push.

---

## Auth

- Users sign up and log in with email + password via Supabase Auth
- A confirmation email is sent on sign up
- Sessions persist across devices — log in anywhere to access your list

---

## License

Do whatever you want with it.
