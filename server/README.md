# Portfolio Enquiry API

A small Express backend for the "Let's Work Together" enquiry form on the
portfolio site.

```
Visitor
  ↓
Enquiry Form (React)
  ↓  fetch POST /api/enquiry
Validation + Honeypot + Rate Limit
  ↓
REST API (Express)
  ↓
Database (data/enquiries.json)
  ↓
Email Notification (Nodemailer)
  ↓
Your Inbox  +  Auto-reply to visitor
```

Enquiries move through a simple status lifecycle you update from the admin
dashboard: `NEW → CONTACTED → IN_DISCUSSION → COMPLETED`.

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env with your SMTP credentials and an ADMIN_TOKEN
npm run dev
```

The API starts on `http://localhost:5000` by default.

## Configure the frontend

In the portfolio's root folder, create a `.env` file (copy `.env.example`)
and point it at this server:

```
VITE_API_URL=http://localhost:5000
```

## Email delivery (SMTP)

Any SMTP provider works (Gmail, Outlook, SendGrid, Resend, etc). For Gmail:

1. Turn on 2-Step Verification on the Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords).
3. Put that (not your normal password) in `SMTP_PASS`.

If SMTP isn't configured, the API still saves every enquiry to
`data/enquiries.json` — it just skips sending emails and logs a note to the
console instead, so the form never breaks in local development.

## Admin dashboard

Open `http://localhost:5000/admin.html`, paste the `ADMIN_TOKEN` from your
`.env`, and you'll see every enquiry with an inline status dropdown.

This is intentionally a single static page with no login system — treat the
`ADMIN_TOKEN` like a password and don't commit your real `.env` file. For a
production deployment, put this behind proper auth (e.g. a real user/session
system) before relying on it.

## Spam protection

- **Honeypot field** — a hidden `company` input; real visitors never fill it,
  bots that auto-fill every field do, and those submissions are silently
  dropped.
- **Rate limiting** — 5 submissions per 15 minutes per IP (`index.js`).
- **Cloudflare Turnstile (optional)** — set `TURNSTILE_SECRET_KEY` in `.env`
  and wire up a Turnstile widget on the frontend to add a real CAPTCHA layer.
  See `src/lib/turnstile.js` for the verification helper. Left disabled by
  default so the form works out of the box without extra sign-ups.

## Swapping in a real database

Everything reads/writes through `src/lib/db.js`. To move off the JSON file,
replace the functions in that file with calls to Postgres/MongoDB/etc. — the
routes in `src/routes/enquiry.js` don't need to change.

## Deploying

Any Node host works (Render, Railway, Fly.io, a VPS, etc). Set the same
environment variables from `.env.example` in your host's dashboard, and
update `VITE_API_URL` in the frontend to the deployed API's URL.
