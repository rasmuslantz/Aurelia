# Aurelia — Luxury Jewelry Landing (React + Tailwind)

A clean, mobile‑first landing page for **Aurelia** that picks the best jewelry using **AI**. Includes:
- **EN/ES language picker**
- **Typewriter trait ticker** (personality · astrology · style · looks · …)
- Luxe **logo**, shimmer accents, and subtle sparkles
- Email waitlist (saved to `localStorage` in this demo)

## Quick start
```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

## Deploy to Cloudflare Pages
1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Cloudflare → **Pages** → **Create project** → Connect to your repo.
3. **Framework preset:** *Vite*  
   **Build command:** `npm run build`  
   **Build output:** `dist`
4. Click **Save and Deploy**.

## Tech
- React + Vite + TypeScript
- TailwindCSS
- framer‑motion + lucide‑react

> Replace the localStorage waitlist with your real endpoint when you’re ready.
