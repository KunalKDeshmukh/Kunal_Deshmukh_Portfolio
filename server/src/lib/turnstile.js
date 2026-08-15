// Optional CAPTCHA layer using Cloudflare Turnstile. If TURNSTILE_SECRET_KEY
// is not set, verification is skipped and the app relies on the honeypot
// field + rate limiting instead. To enable it:
//   1. Create a Turnstile widget at https://dash.cloudflare.com/ (Turnstile).
//   2. Put the site key in the frontend widget and the secret key here.
//   3. Have the frontend send the returned token as `turnstileToken`.
export async function verifyTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured — treat as passed
  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return !!data.success
  } catch {
    return false
  }
}
