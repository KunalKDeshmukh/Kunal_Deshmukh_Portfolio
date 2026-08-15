import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { enquiryTypes, contactMethods, email } from '../data/portfolioData'
import { ArrowRightIcon, CheckCircleIcon, AlertIcon, MailIcon, WhatsappIcon, ChevronDownIcon } from './Icons'

// In production (Vercel) this is left empty so the form posts to the
// same-origin /api/enquiry serverless function. Set VITE_API_URL only if
// you're running the standalone /server backend instead (e.g. locally).
const API_URL = import.meta.env.VITE_API_URL || ''

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  enquiryType: enquiryTypes[0],
  subject: '',
  message: '',
  budget: '',
  preferredContact: contactMethods[0],
  // Honeypot: real visitors never see/fill this. Bots that auto-fill every
  // input will trip it, and the submission is silently rejected.
  company: '',
}

const inputClass =
  'w-full rounded-xl border border-ink-line bg-ink-raised px-4 py-3 text-sm text-bone placeholder:text-bone-dim outline-none transition-colors focus:border-cobalt'

const labelClass = 'block font-mono text-[11px] uppercase tracking-widest text-bone-dim mb-2'

function FieldError({ error }) {
  if (!error) return null
  return <p className="mt-1.5 text-xs text-amber">{error}</p>
}

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (form.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!form.subject.trim()) next.subject = 'Please add a short subject.'
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Please describe your enquiry (at least 10 characters).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side spam/abuse guards. The real rate limit lives on the
    // server (see server/README.md) — this just avoids obvious double-clicks.
    if (form.company) {
      // Honeypot tripped — pretend it worked and do nothing further.
      setStatus('success')
      return
    }
    const now = Date.now()
    if (now - lastSubmittedAt < 20000) {
      setErrors({ form: 'Please wait a few seconds before sending another enquiry.' })
      return
    }
    if (!validate()) return

    setStatus('submitting')
    try {
      const res = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setLastSubmittedAt(now)
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-ink-line bg-ink-surface p-8 text-center"
      >
        <span className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-amber/10 text-amber">
          <CheckCircleIcon className="w-6 h-6" />
        </span>
        <h3 className="mt-4 font-display font-semibold text-xl text-bone">Enquiry sent — thank you!</h3>
        <p className="mt-2 text-sm text-bone-muted leading-relaxed max-w-sm mx-auto">
          I&rsquo;ve received your enquiry and will get back to you shortly, usually within 1&ndash;2 business days.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 font-medium text-sm text-bone transition-colors hover:border-amber hover:text-amber"
          >
            <MailIcon className="w-4 h-4" />
            Email me directly
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 font-medium text-sm text-bone transition-colors hover:border-cobalt hover:text-cobalt-soft"
          >
            <WhatsappIcon className="w-4 h-4" />
            Continue on WhatsApp
          </a>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 font-mono text-xs uppercase tracking-widest text-bone-dim hover:text-bone"
        >
          Send another enquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-ink-line bg-ink-surface p-6 md:p-8">
      {/* Honeypot field — hidden from real users via CSS, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>Full Name</label>
          <input id="fullName" type="text" value={form.fullName} onChange={update('fullName')} placeholder="Your name" className={inputClass} />
          <FieldError error={errors.fullName} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input id="email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className={inputClass} />
          <FieldError error={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number <span className="normal-case text-bone-dim/70">(optional)</span></label>
          <input id="phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="+91 98765 43210" className={inputClass} />
          <FieldError error={errors.phone} />
        </div>
        <div>
          <label htmlFor="enquiryType" className={labelClass}>Enquiry Type</label>
          <div className="relative">
            <select id="enquiryType" value={form.enquiryType} onChange={update('enquiryType')} className={`${inputClass} appearance-none pr-10`}>
              {enquiryTypes.map((type) => (
                <option key={type} value={type} className="bg-ink-surface">{type}</option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone-dim" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="subject" className={labelClass}>Subject</label>
          <input id="subject" type="text" value={form.subject} onChange={update('subject')} placeholder="What's this about?" className={inputClass} />
          <FieldError error={errors.subject} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>Message / Requirements</label>
          <textarea id="message" rows={5} value={form.message} onChange={update('message')} placeholder="Tell me a bit about the role, project or idea you have in mind." className={`${inputClass} resize-none`} />
          <FieldError error={errors.message} />
        </div>

        <AnimatePresence>
          {form.enquiryType === 'Freelance Project' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:col-span-2 overflow-hidden"
            >
              <label htmlFor="budget" className={labelClass}>Budget <span className="normal-case text-bone-dim/70">(optional)</span></label>
              <input id="budget" type="text" value={form.budget} onChange={update('budget')} placeholder="e.g. ₹30,000 – ₹60,000 or $500 – $1000" className={inputClass} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sm:col-span-2">
          <label className={labelClass}>Preferred Contact Method</label>
          <div className="flex flex-wrap gap-2">
            {contactMethods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setForm((f) => ({ ...f, preferredContact: method }))}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  form.preferredContact === method
                    ? 'border-amber text-amber bg-amber/10'
                    : 'border-ink-line text-bone-muted hover:border-bone-dim'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {errors.form && (
        <p className="mt-5 flex items-center gap-2 text-sm text-amber">
          <AlertIcon className="w-4 h-4" /> {errors.form}
        </p>
      )}

      {status === 'error' && (
        <p className="mt-5 flex items-center gap-2 text-sm text-amber">
          <AlertIcon className="w-4 h-4" />
          Something went wrong sending your enquiry. Please try again, or email me directly at{' '}
          <a href={`mailto:${email}`} className="underline underline-offset-2">{email}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group mt-7 inline-flex items-center gap-2 rounded-full bg-bone text-ink px-6 py-3 font-medium text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
        {status !== 'submitting' && <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
      </button>

      <p className="mt-4 text-xs text-bone-dim">
        By submitting, you agree to be contacted back about this enquiry. No spam, ever.
      </p>
    </form>
  )
}
