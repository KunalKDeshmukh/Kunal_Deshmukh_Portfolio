// Vercel Serverless Function — handles POST /api/enquiry from EnquiryForm.jsx.
//
// This runs as a stateless function on every submit, so there's no database
// or file storage here (Vercel's filesystem is read-only/ephemeral at
// runtime). It emails you the enquiry via SMTP and sends the visitor an
// auto-reply. Configure the SMTP_* and NOTIFY_EMAIL env vars in your Vercel
// project settings (see .env.example) — with none set, the function still
// validates and returns success, it just skips sending email.
//
// If you later want submissions saved to a dashboard/database instead of
// (or in addition to) email, swap the `notify()` call below for a write to
// something like Vercel Postgres, Supabase, or Airtable.

import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s-]{6,}$/
const ENQUIRY_TYPES = ['Job Opportunity', 'Internship', 'Freelance Project', 'Collaboration', 'Project Discussion', 'Other']

function validate(body) {
  const errors = {}
  if (!body.fullName || !body.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!body.email || !EMAIL_RE.test(body.email)) errors.email = 'A valid email is required.'
  if (body.phone && !PHONE_RE.test(body.phone)) errors.phone = 'Invalid phone number.'
  if (!body.subject || !body.subject.trim()) errors.subject = 'Subject is required.'
  if (!body.message || body.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  if (body.enquiryType && !ENQUIRY_TYPES.includes(body.enquiryType)) errors.enquiryType = 'Invalid enquiry type.'
  return errors
}

let transporter = null
function getTransporter() {
  if (transporter) return transporter
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

async function notify(enquiry) {
  const t = getTransporter()
  const notifyTo = process.env.NOTIFY_EMAIL
  if (!t) return // SMTP not configured — skip silently, request still succeeds

  const tasks = []

  if (notifyTo) {
    tasks.push(
      t.sendMail({
        from: `"Portfolio Enquiries" <${process.env.SMTP_USER}>`,
        to: notifyTo,
        replyTo: enquiry.email,
        subject: `New enquiry: ${enquiry.enquiryType} — ${enquiry.subject}`,
        text: [
          'New enquiry received via the portfolio site.',
          '',
          `Name: ${enquiry.fullName}`,
          `Email: ${enquiry.email}`,
          `Phone: ${enquiry.phone || '—'}`,
          `Type: ${enquiry.enquiryType}`,
          `Subject: ${enquiry.subject}`,
          `Budget: ${enquiry.budget || '—'}`,
          `Preferred contact: ${enquiry.preferredContact}`,
          '',
          'Message:',
          enquiry.message,
        ].join('\n'),
      })
    )
  }

  tasks.push(
    t.sendMail({
      from: `"Kunal Deshmukh" <${process.env.SMTP_USER}>`,
      to: enquiry.email,
      subject: `Thanks for reaching out, ${enquiry.fullName.split(' ')[0]}!`,
      text: [
        `Hi ${enquiry.fullName.split(' ')[0]},`,
        '',
        `Thanks for reaching out! I've received your enquiry ("${enquiry.subject}") and will get back to you shortly, usually within 1-2 business days.`,
        '',
        "Here's a copy of what you sent:",
        enquiry.message,
        '',
        'Talk soon,',
        'Kunal',
      ].join('\n'),
    })
  )

  await Promise.allSettled(tasks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = req.body || {}

  // Honeypot: real visitors never fill this hidden field.
  if (body.company) {
    return res.status(200).json({ ok: true })
  }

  const errors = validate(body)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  const enquiry = {
    id: (globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)),
    fullName: body.fullName.trim(),
    email: body.email.trim(),
    phone: (body.phone || '').trim(),
    enquiryType: body.enquiryType || 'Other',
    subject: body.subject.trim(),
    message: body.message.trim(),
    budget: (body.budget || '').trim(),
    preferredContact: body.preferredContact || 'Email',
    createdAt: new Date().toISOString(),
  }

  try {
    await notify(enquiry)
  } catch (err) {
    // Don't fail the request just because email delivery had a hiccup.
    console.error('[api/enquiry] notify failed:', err.message)
  }

  return res.status(201).json({ ok: true, id: enquiry.id })
}
