import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { rateLimit } from 'express-rate-limit'
import enquiryRouter from './src/routes/enquiry.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

// Serve the small static admin dashboard at /admin.html
app.use(express.static(path.join(__dirname, 'public')))

// Rate limit the public enquiry endpoint: 5 submissions per 15 minutes
// per IP. Admin routes are excluded (they're behind requireAdmin instead).
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many enquiries from this device. Please try again later.' },
})

app.use('/api/enquiry', enquiryLimiter)
app.use('/api', enquiryRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Enquiry API listening on http://localhost:${PORT}`)
  console.log(`Admin dashboard at http://localhost:${PORT}/admin.html`)
})
