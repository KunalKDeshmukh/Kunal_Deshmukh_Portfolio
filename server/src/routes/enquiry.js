import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { addEnquiry, listEnquiries, updateStatus, STATUSES } from '../lib/db.js'
import { sendAdminNotification, sendAutoReply } from '../lib/mailer.js'
import { verifyTurnstile } from '../lib/turnstile.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ENQUIRY_TYPES = ['Job Opportunity', 'Internship', 'Freelance Project', 'Collaboration', 'Project Discussion', 'Other']

function validateEnquiry(body) {
  const errors = {}
  if (!body.fullName || !body.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!body.email || !EMAIL_RE.test(body.email)) errors.email = 'A valid email is required.'
  if (body.phone && !/^[+\d][\d\s-]{6,}$/.test(body.phone)) errors.phone = 'Invalid phone number.'
  if (!body.subject || !body.subject.trim()) errors.subject = 'Subject is required.'
  if (!body.message || body.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  if (body.enquiryType && !ENQUIRY_TYPES.includes(body.enquiryType)) errors.enquiryType = 'Invalid enquiry type.'
  return errors
}

// POST /api/enquiry — public, rate-limited (see index.js), validated
router.post('/enquiry', async (req, res) => {
  const body = req.body || {}

  // Honeypot: a real visitor never fills this hidden field.
  if (body.company) {
    return res.status(200).json({ ok: true }) // pretend success, do nothing
  }

  if (body.turnstileToken !== undefined || process.env.TURNSTILE_SECRET_KEY) {
    const passed = await verifyTurnstile(body.turnstileToken)
    if (!passed) return res.status(400).json({ ok: false, error: 'CAPTCHA verification failed.' })
  }

  const errors = validateEnquiry(body)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  const enquiry = {
    id: uuid(),
    fullName: body.fullName.trim(),
    email: body.email.trim(),
    phone: (body.phone || '').trim(),
    enquiryType: body.enquiryType || 'Other',
    subject: body.subject.trim(),
    message: body.message.trim(),
    budget: (body.budget || '').trim(),
    preferredContact: body.preferredContact || 'Email',
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await addEnquiry(enquiry)

  // Fire-and-forget: don't fail the request just because email delivery
  // had a hiccup — the enquiry is already saved.
  sendAdminNotification(enquiry).catch((err) => console.error('[mailer] admin notify failed:', err.message))
  sendAutoReply(enquiry).catch((err) => console.error('[mailer] auto-reply failed:', err.message))

  return res.status(201).json({ ok: true, id: enquiry.id })
})

// GET /api/admin/enquiries — protected, lists all enquiries for the dashboard
router.get('/admin/enquiries', requireAdmin, async (_req, res) => {
  const enquiries = await listEnquiries()
  res.json({ ok: true, enquiries })
})

// PATCH /api/admin/enquiries/:id/status — protected, moves an enquiry through
// the NEW -> CONTACTED -> IN_DISCUSSION -> COMPLETED lifecycle
router.patch('/admin/enquiries/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body || {}
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ ok: false, error: `Status must be one of ${STATUSES.join(', ')}` })
  }
  const updated = await updateStatus(req.params.id, status)
  if (!updated) return res.status(404).json({ ok: false, error: 'Enquiry not found.' })
  res.json({ ok: true, enquiry: updated })
})

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return res.status(500).json({ ok: false, error: 'Admin dashboard not configured (ADMIN_TOKEN missing).' })
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (token !== expected) return res.status(401).json({ ok: false, error: 'Unauthorized.' })
  next()
}

export default router
