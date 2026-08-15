import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return transporter
}

export async function sendAdminNotification(enquiry) {
  const t = getTransporter()
  const to = process.env.NOTIFY_EMAIL
  if (!t || !to) {
    console.log('[mailer] SMTP not configured — skipping admin notification email.')
    return
  }

  await t.sendMail({
    from: `"Portfolio Enquiries" <${process.env.SMTP_USER}>`,
    to,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.enquiryType} — ${enquiry.subject}`,
    text: [
      `New enquiry received via the portfolio site.`,
      ``,
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || '—'}`,
      `Type: ${enquiry.enquiryType}`,
      `Subject: ${enquiry.subject}`,
      `Budget: ${enquiry.budget || '—'}`,
      `Preferred contact: ${enquiry.preferredContact}`,
      ``,
      `Message:`,
      enquiry.message,
      ``,
      `Enquiry ID: ${enquiry.id}`,
    ].join('\n'),
  })
}

export async function sendAutoReply(enquiry) {
  const t = getTransporter()
  if (!t) {
    console.log('[mailer] SMTP not configured — skipping auto-reply email.')
    return
  }

  await t.sendMail({
    from: `"Kunal Deshmukh" <${process.env.SMTP_USER}>`,
    to: enquiry.email,
    subject: `Thanks for reaching out, ${enquiry.fullName.split(' ')[0]}!`,
    text: [
      `Hi ${enquiry.fullName.split(' ')[0]},`,
      ``,
      `Thanks for reaching out! I've received your enquiry ("${enquiry.subject}") and will get back to you shortly, usually within 1-2 business days.`,
      ``,
      `Here's a copy of what you sent:`,
      enquiry.message,
      ``,
      `Talk soon,`,
      `Kunal`,
    ].join('\n'),
  })
}
