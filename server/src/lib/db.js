// Minimal file-based "database" so the project runs with zero external
// infrastructure. Swap this module out for a real database (Postgres,
// MongoDB, etc.) later without touching the routes — just keep the same
// function signatures (listEnquiries, getEnquiry, addEnquiry, updateStatus).
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../../data')
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json')

async function ensureStore() {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
  if (!existsSync(DATA_FILE)) await writeFile(DATA_FILE, '[]', 'utf-8')
}

async function readAll() {
  await ensureStore()
  const raw = await readFile(DATA_FILE, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeAll(enquiries) {
  await writeFile(DATA_FILE, JSON.stringify(enquiries, null, 2), 'utf-8')
}

// Enquiry status lifecycle: NEW -> CONTACTED -> IN_DISCUSSION -> COMPLETED
export const STATUSES = ['NEW', 'CONTACTED', 'IN_DISCUSSION', 'COMPLETED']

export async function listEnquiries() {
  const all = await readAll()
  return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getEnquiry(id) {
  const all = await readAll()
  return all.find((e) => e.id === id) || null
}

export async function addEnquiry(enquiry) {
  const all = await readAll()
  all.push(enquiry)
  await writeAll(all)
  return enquiry
}

export async function updateStatus(id, status) {
  if (!STATUSES.includes(status)) throw new Error('Invalid status')
  const all = await readAll()
  const idx = all.findIndex((e) => e.id === id)
  if (idx === -1) return null
  all[idx].status = status
  all[idx].updatedAt = new Date().toISOString()
  await writeAll(all)
  return all[idx]
}
