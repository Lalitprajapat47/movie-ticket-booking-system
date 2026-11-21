import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { MOVIES, CINEMAS, SHOWS, SEAT_CATS, COUPONS, NEWS, OFFERS } from './data.js'
import { analyze } from './ai.js'

const PORT = process.env.PORT || 4000
const DB = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json')
const load = () => { try { return JSON.parse(fs.readFileSync(DB, 'utf8')) } catch { return { bookings: [], events: [] } } }
const save = d => fs.writeFileSync(DB, JSON.stringify(d, null, 2))
const cid = req => req.get('x-client-id') || 'guest'
const sameShow = (b, movieId, cinemaId, date, time) => b.movieId === +movieId && b.cinemaId === +cinemaId && b.date === date && b.time === time
const rowCat = r => Object.values(SEAT_CATS).find(c => c.rows.includes(r))

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }))

// ---- movies, cinemas, shows
app.get('/api/movies', (req, res) => {
  const { q, genre, lang, format, status } = req.query
  res.json(MOVIES.filter(m => (!genre || m.genres.includes(genre)) && (!lang || m.lang === lang) && (!format || m.formats.includes(format)) &&
    (!status || m.status === status) && (!q || (m.title + m.genres.join()).toLowerCase().includes(String(q).toLowerCase()))))
})
app.get('/api/movies/:id', (req, res) => {
  const m = MOVIES.find(x => x.id === +req.params.id)
  m ? res.json(m) : res.status(404).json({ error: 'Movie not found' })
})
app.get('/api/cinemas', (req, res) => res.json(CINEMAS.filter(c => !req.query.city || c.city === req.query.city)))
app.get('/api/shows', (req, res) => {
  const m = MOVIES.find(x => x.id === +req.query.movieId)
  if (!m) return res.status(404).json({ error: 'Movie not found' })
  const shows = SHOWS.filter(s => m.formats.includes(s.f))
  res.json(CINEMAS.filter(c => !req.query.city || c.city === req.query.city).map(c => ({ ...c, shows })))
})

// ---- seats, coupons, bookings
app.get('/api/seats', (req, res) => {
  const { movieId, cinemaId, date, time } = req.query
  res.json({ booked: load().bookings.filter(b => sameShow(b, movieId, cinemaId, date, time)).flatMap(b => b.seats) })
})
app.post('/api/coupons/validate', (req, res) => {
  const d = COUPONS[String(req.body?.code || '').trim().toUpperCase()]
  res.json(d ? { valid: true, discount: d } : { valid: false, discount: 0 })
})
app.post('/api/bookings', (req, res) => {
  const { movieId, cinemaId, date, time, fmt, seats, pay, coupon } = req.body || {}
  const m = MOVIES.find(x => x.id === +movieId), c = CINEMAS.find(x => x.id === +cinemaId)
  if (!m || !c) return res.status(400).json({ error: 'Invalid movie or cinema' })
  if (m.status !== 'now') return res.status(400).json({ error: 'Bookings are not open for this movie yet' })
  if (!date || !time) return res.status(400).json({ error: 'Date and time are required' })
  if (!Array.isArray(seats) || !seats.length || seats.length > 6) return res.status(400).json({ error: 'Select 1 to 6 seats' })
  if (!seats.every(s => /^[A-H](10|[1-9])$/.test(s)) || new Set(seats).size !== seats.length) return res.status(400).json({ error: 'Invalid seats' })
  const db = load()
  const taken = new Set(db.bookings.filter(b => sameShow(b, m.id, c.id, date, time)).flatMap(b => b.seats))
  const clash = seats.filter(s => taken.has(s))
  if (clash.length) return res.status(409).json({ error: `Seats already booked: ${clash.join(', ')}`, seats: clash })
  const sub = seats.reduce((a, s) => a + rowCat(s[0]).price, 0)
  const code = String(coupon || '').trim().toUpperCase(), off = COUPONS[code] || 0
  const ticket = {
    id: 'CB' + Date.now().toString().slice(-7), clientId: cid(req), movieId: m.id, title: m.title, cinemaId: c.id, cinema: c.name, city: c.city,
    date, time, fmt, seats, subtotal: sub, coupon: off ? code : null, total: Math.round(sub * (1 - off)), pay: pay || 'UPI', createdAt: new Date().toISOString(),
  }
  db.bookings.unshift(ticket); save(db)
  res.status(201).json(ticket)
})
app.get('/api/bookings', (req, res) => res.json(load().bookings.filter(b => b.clientId === cid(req))))
app.delete('/api/bookings/:id', (req, res) => {
  const db = load(), i = db.bookings.findIndex(b => b.id === req.params.id && b.clientId === cid(req))
  if (i < 0) return res.status(404).json({ error: 'Ticket not found' })
  db.bookings.splice(i, 1); save(db); res.json({ ok: true })
})

// ---- behaviour events + AI insights
app.get('/api/events', (req, res) => res.json(load().events.filter(e => e.clientId === cid(req)).map(({ clientId, ...e }) => e)))
app.post('/api/events', (req, res) => {
  const { type } = req.body || {}
  if (typeof type !== 'string') return res.status(400).json({ error: 'type is required' })
  const db = load(); db.events.push({ ...req.body, clientId: cid(req), ts: req.body.ts || Date.now() })
  db.events = db.events.slice(-3000); save(db); res.status(201).json({ ok: true })
})
app.put('/api/events', (req, res) => {
  const list = Array.isArray(req.body?.events) ? req.body.events : []
  const db = load(); db.events = db.events.filter(e => e.clientId !== cid(req)).concat(list.map(e => ({ ...e, clientId: cid(req) })))
  save(db); res.json({ ok: true, count: list.length })
})
app.get('/api/insights', (req, res) => res.json(analyze(load().events.filter(e => e.clientId === cid(req)))))

// ---- content
app.get('/api/offers', (req, res) => res.json(OFFERS))
app.get('/api/news', (req, res) => res.json(NEWS))
app.get('/api/news/:id', (req, res) => { const n = NEWS.find(x => x.id === +req.params.id); n ? res.json(n) : res.status(404).json({ error: 'Article not found' }) })

app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }))
app.listen(PORT, () => console.log(`CineBook API running on http://localhost:${PORT}`))
