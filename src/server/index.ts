import express, { type NextFunction, type Request, type Response } from 'express'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  boardRows,
  lab,
  nav,
  statuses,
  statusCounts,
  ventures,
} from '../content/lab.ts'
import { addWaitlistEntry } from './db.ts'

const PORT = Number(process.env.PORT ?? 8787)
const IS_PROD = process.env.NODE_ENV === 'production'
const CLIENT_DIR = resolve(process.cwd(), 'dist/client')
const HAS_CLIENT_BUILD = existsSync(resolve(CLIENT_DIR, 'index.html'))

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(express.json({ limit: '32kb' }))

/**
 * Security headers. Nothing here needs a remote origin: fonts and styles are
 * local, there are no third-party scripts, and there is no analytics.
 */
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  if (IS_PROD) {
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "img-src 'self' data:",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        'upgrade-insecure-requests',
      ].join('; '),
    )
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  next()
})

/** Structured request line with no personal data. */
app.use((req, res, next) => {
  const started = performance.now()
  res.on('finish', () => {
    const ms = Math.round(performance.now() - started)
    console.log(`${req.method} ${req.path} ${res.statusCode} ${ms}ms`)
  })
  next()
})

/** Small in-memory limiter, keyed by address. One process, no external store. */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 6
const rateBuckets = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const hits = (rateBuckets.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  hits.push(now)
  rateBuckets.set(key, hits)
  if (rateBuckets.size > 5000) {
    for (const [k, v] of rateBuckets) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) rateBuckets.delete(k)
    }
  }
  return hits.length > RATE_MAX
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_VENTURES = new Set([...ventures.map((v) => v.slug), 'any'])

interface WaitlistBody {
  email?: unknown
  venture?: unknown
  note?: unknown
  company_website?: unknown
  source?: unknown
}

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'xylvanthrex-labs',
    storage: 'sqlite',
    time: new Date().toISOString(),
  })
})

app.get('/api/statuses', (_req, res) => {
  res.json({ statuses, counts: statusCounts() })
})

app.get('/api/board', (_req, res) => {
  res.json({
    rows: boardRows,
    counts: statusCounts(),
    total: boardRows.length,
    generatedAt: new Date().toISOString(),
  })
})

app.get('/api/ventures', (_req, res) => {
  res.json({ ventures, count: ventures.length })
})

app.get('/api/ventures/:slug', (req, res) => {
  const venture = ventures.find((v) => v.slug === req.params.slug)
  if (!venture) {
    res.status(404).json({ ok: false, error: 'No unit with that slug.' })
    return
  }
  res.json({ venture })
})

app.get('/api/lab', (_req, res) => {
  res.json({
    lab,
    nav,
    statuses,
    counts: statusCounts(),
    units: ventures.map((v) => ({
      slug: v.slug,
      name: v.name,
      kind: v.kind,
      layer: v.layer,
      status: v.status,
    })),
  })
})

app.post('/api/waitlist', (req, res) => {
  const body = (req.body ?? {}) as WaitlistBody
  const honeypot = asString(body.company_website, 200)

  // A filled honeypot gets the same shape of success and is not stored.
  if (honeypot) {
    res.status(201).json({ ok: true, message: 'Saved. We only write when there is something real to share.' })
    return
  }

  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown'
  if (isRateLimited(`waitlist:${ip}`)) {
    res.status(429).json({
      ok: false,
      error: 'Too many attempts. Try again later, or come back tomorrow.',
    })
    return
  }

  const email = asString(body.email, 254).toLowerCase()
  const venture = asString(body.venture, 60) || 'any'
  const note = asString(body.note, 1200)
  const source = asString(body.source, 40) || 'lab'

  const errors: Record<string, string> = {}
  if (!email) errors.email = 'An email address is required.'
  else if (!EMAIL_RE.test(email)) errors.email = 'That does not look like an email address.'
  if (!ALLOWED_VENTURES.has(venture)) errors.venture = 'Choose one of the listed units.'

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors })
    return
  }

  try {
    const id = addWaitlistEntry({ email, venture, note, source })
    res.status(201).json({
      ok: true,
      id,
      message: 'Saved. We only write when there is something real to share.',
    })
  } catch (error) {
    console.error('waitlist insert failed', error)
    res.status(500).json({ ok: false, error: 'The entry could not be saved. Try again.' })
  }
})

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'Unknown API route.' })
})

if (HAS_CLIENT_BUILD) {
  app.use(
    express.static(CLIENT_DIR, {
      index: false,
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
        else if (path.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400')
        }
      },
    }),
  )

  app.get('*', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.sendFile(resolve(CLIENT_DIR, 'index.html'))
  })
} else {
  app.get('*', (_req, res) => {
    res
      .status(503)
      .type('text/plain')
      .send(
        'The client build is missing. Run `npm run dev` for the development server, or `npm run build` and `npm start` for production.',
      )
  })
}

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ ok: false, error: 'The request body is not valid JSON.' })
    return
  }
  console.error('unhandled error', error)
  res.status(500).json({ ok: false, error: 'Something failed on the server.' })
})

app.listen(PORT, () => {
  console.log(
    `Xylvanthrex Labs API listening on http://localhost:${PORT} (${IS_PROD ? 'production' : 'development'}${HAS_CLIENT_BUILD ? ', serving dist/client' : ', client served by Vite'})`,
  )
})
