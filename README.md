# Kunal Deshmukh — Portfolio

A dark, minimal, motion-driven personal portfolio built with **React + Vite + Tailwind CSS + Framer Motion + React Router**, plus a **Vercel Serverless Function** (`api/enquiry.js`) that powers a real enquiry/contact form — no separate backend to host.

## Deploy to Vercel (recommended path)

This repo is set up to deploy as a single Vercel project — frontend and the
`/api/enquiry` function together, no separate server needed.

1. Push this folder to a GitHub repo (or use `vercel` CLI directly from this
   folder).
2. In Vercel: **Add New Project → Import** your repo. Vercel auto-detects
   Vite (`vercel.json` also pins the build command, output dir and SPA
   rewrite explicitly, so this works even on "Other framework" detection).
3. Before the first deploy (or any time after, in **Project Settings → Environment Variables**), add:
   - `NOTIFY_EMAIL` — inbox that should receive enquiry emails
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — SMTP creds used to send notification + auto-reply emails (see `.env.example` for a Gmail app-password example)
   - Leave `VITE_API_URL` **unset** — the form calls the same-origin `/api/enquiry` function automatically.
4. Deploy. That's it — the enquiry form, routing (`/education`), and static assets all work out of the box.

If you skip the SMTP env vars, the form still accepts and validates
submissions successfully (so visitors never see an error), it just won't
send you an email — everything else on the site works fine either way.

> Note: `api/enquiry.js` doesn't persist enquiries to a database (Vercel's
> functions are stateless/ephemeral) — it only emails them to you. If you
> want a searchable log of submissions later, wire in a database (Vercel
> Postgres, Supabase, Airtable, etc.) inside `notify()`.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Note: `npm run dev` only serves the frontend — the `/api/enquiry` function
needs the Vercel dev runtime to work locally. Either run `npx vercel dev`
instead of `npm run dev` (it serves both the frontend and `/api` functions,
and picks up a local `.env` file), or just test the form against your
deployed Vercel URL.

Build for production:

```bash
npm run build
npm run preview   # preview the production build locally (frontend only, no /api)
```

## Legacy standalone backend (`server/`)

The `server/` folder is a self-contained Express API with file-based
storage and an admin dashboard, kept for reference or if you'd rather host
the API separately (Render, Railway, a VPS, etc.) instead of using
`api/enquiry.js`. See `server/README.md`. If you deploy this way, set
`VITE_API_URL` in Vercel to that API's URL. It is **not** required for the
Vercel deploy path above.

## Where things live

```
src/
  data/portfolioData.js   ← all editable content: name, hero copy, tech stack,
                             projects, socials, education, certifications
  pages/
    Home.jsx               ← Hero + About + Projects + Contact
    Education.jsx          ← School / College / University timeline + certifications
  components/
    Navbar.jsx              ← fixed nav, centered circular "KD" logo, social icons, Education link
    Hero.jsx                ← hero layout: portrait + text/CTA + decorative elements
    DeveloperArt.jsx        ← left-side portrait area (currently an abstract silhouette)
    FloatingBadge.jsx       ← the small floating tech pills around the portrait
    HireMeBadge.jsx         ← bottom-left rotating circular "Available for Hire" badge
    LightbulbDecor.jsx      ← bottom-right glowing lightbulb decoration
    About.jsx               ← skills / toolbox grid
    Projects.jsx / ProjectCard.jsx ← featured project cards (each links to GitHub)
    Contact.jsx              ← quick links + enquiry form
    EnquiryForm.jsx           ← the full "Let's Work Together" form
    Footer.jsx                ← shared footer (Home + Education pages)
    ScrollProgress.jsx        ← top scroll progress bar
    BackToTop.jsx              ← floating back-to-top button
api/enquiry.js                 ← Vercel serverless function powering the enquiry form (used on Vercel deploys)
server/                        ← legacy standalone Express API (optional alternative, see server/README.md)
```

## Background video

The whole site now runs on a looping fixed background video (`public/videos/hero-bg.mp4`) instead of a flat black background, with a dark scrim (`BackgroundVideo.jsx`) layered on top so text stays readable. To swap it for a different clip, replace that file (keep the same filename, or update the `src` in `src/components/BackgroundVideo.jsx`). It autoplays muted and loops, and pauses automatically if the visitor has "reduce motion" enabled.

## Things to personalize before you deploy

1. **Your photo** — `DeveloperArt.jsx` currently renders an abstract silhouette (no photo was supplied). To use a real photo, replace the inner `<svg>` in the "photo slot" `<div>` with:
   ```jsx
   <img src="/your-photo.jpg" alt="Kunal Deshmukh" className="w-full h-full object-cover" />
   ```
   and drop `your-photo.jpg` into `public/`.

2. **Resume** — add your PDF to `public/resume.pdf` (the "Download Resume" buttons already link to `/resume.pdf`).

3. **Social links & email** — update `socialLinks` in `src/data/portfolioData.js` with your real GitHub, LinkedIn and email (email is already set).

4. **Project GitHub links** — update the `github` field on each project in `portfolioData.js` with your real repo URLs (currently placeholders under `github.com/1015kunaldeshmukh/...`).

5. **Education & certifications** — replace the placeholder institution names, dates and scores in the `education` and `certifications` arrays in `portfolioData.js` with your real details.

6. **Location / WhatsApp** — set `profile.location` and `profile.whatsapp` (digits only, with country code) in `portfolioData.js`.

7. **Enquiry form emails** — add `NOTIFY_EMAIL` + `SMTP_*` env vars in Vercel Project Settings so `api/enquiry.js` can actually send you the notification + auto-reply emails (see "Deploy to Vercel" above).

## Design notes

- Palette: near-black base (`#08080A`), off-white text, with a two-accent system — electric blue (`cobalt`) for code/cloud/AI, amber for ideas/CTA energy (the "Hire Me" badge and lightbulb).
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels/eyebrows).
- Motion respects `prefers-reduced-motion`.
- Fully responsive from mobile up; the floating tech badges hide below the `sm` breakpoint to keep small screens uncluttered.

