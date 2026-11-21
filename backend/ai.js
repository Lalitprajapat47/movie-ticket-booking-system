import { MOVIES, byId, CINEMAS } from './data.js'
const bump = (o, k, n = 1) => { if (k) o[k] = (o[k] || 0) + n }
const top = (o, n = 5) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n)
const bucket = (t) => { const [h, rest] = t.split(':'); let H = +h % 12; if (t.includes('PM')) H += 12; return H < 12 ? 'Morning' : H < 17 ? 'Afternoon' : H < 20 ? 'Evening' : 'Night' }
export const STAGES = ['search', 'genre', 'view', 'trailer', 'showtime', 'seat', 'intent']
const STAGE_LABEL = { search: 'Movie Search', genre: 'Genre Visit', view: 'Movie View', trailer: 'Trailer Interaction', showtime: 'Showtime Selection', seat: 'Seat Selection', intent: 'Booking Intent' }
export const stageLabel = (s) => STAGE_LABEL[s]
const W = { view: 2, trailer: 3, showtime: 4, seat: 5, intent: 6, booking: 8 }
export function analyze(ev) {
  const genres = {}, langs = {}, fmts = {}, movies = {}, cinemas = {}, slots = {}, seen = new Set(), booked = new Set()
  ev.forEach(e => {
    if (e.type === 'genre') bump(genres, e.genre, 2)
    if (e.type === 'search' && e.q) { const q = e.q.toLowerCase(); MOVIES.forEach(m => { if (m.title.toLowerCase().includes(q) || m.genres.some(x => x.toLowerCase().includes(q))) m.genres.forEach(x => bump(genres, x)) }) }
    if (e.type === 'cinema') bump(cinemas, e.cinema)
    if (e.type === 'showtime') { bump(slots, bucket(e.time)); bump(fmts, e.fmt, 2) }
    const m = e.movieId && byId(e.movieId), w = W[e.type]
    if (m && w) { m.genres.forEach(x => bump(genres, x, w)); bump(langs, m.lang, w); bump(movies, m.title, w); seen.add(m.id); if (e.type === 'booking') booked.add(m.id) }
    if (m && e.type === 'view') m.formats.forEach(f => bump(fmts, f, 0.2))
  })
  const reached = ev.map(e => STAGES.indexOf(e.type === 'booking' ? 'intent' : e.type)).reduce((a, b) => Math.max(a, b), -1)
  const intent = Math.round(((reached + 1) / STAGES.length) * 100) + (booked.size ? 0 : 0)
  const recs = MOVIES.filter(m => !booked.has(m.id)).map(m => {
    const s = m.genres.reduce((a, x) => a + (genres[x] || 0), 0) + (langs[m.lang] || 0) * 0.5 - (seen.has(m.id) ? 3 : 0) + m.rating * 0.1
    return { m, s }
  }).sort((a, b) => b.s - a.s).slice(0, 4)
  const max = recs[0]?.s || 1
  return {
    total: ev.length, genres: top(genres), langs: top(langs), fmts: top(fmts), movies: top(movies), cinemas: top(cinemas), slots: top(slots),
    intent, intentLabel: intent >= 70 ? 'High' : intent >= 40 ? 'Medium' : 'Low', reached,
    recs: recs.map(r => ({ ...r, match: Math.max(55, Math.min(98, Math.round((r.s / max) * 98))) })),
    summary: ev.length ? `You lean towards ${top(genres, 2).map(x => x[0]).join(' & ') || 'a mix of genres'}, mostly in ${top(langs, 1)[0]?.[0] || 'any language'}, and you tend to watch in the ${top(slots, 1)[0]?.[0]?.toLowerCase() || 'evening'}.` : 'No activity yet. Browse movies, watch trailers or pick a showtime and your insights will appear here.',
  }
}
export function demoEvents() {
  const t = Date.now(); const seq = [
    { type: 'search', q: 'sci-fi' }, { type: 'genre', genre: 'Sci-Fi' }, { type: 'genre', genre: 'Action' }, { type: 'view', movieId: 1 }, { type: 'trailer', movieId: 1 },
    { type: 'view', movieId: 8 }, { type: 'view', movieId: 6 }, { type: 'trailer', movieId: 6 }, { type: 'cinema', movieId: 1, cinema: CINEMAS[0].name }, { type: 'cinema', movieId: 1, cinema: CINEMAS[0].name },
    { type: 'showtime', movieId: 1, time: '08:15 PM', fmt: 'IMAX' }, { type: 'showtime', movieId: 6, time: '10:45 PM', fmt: '2D' }, { type: 'seat', movieId: 1 }, { type: 'intent', movieId: 1 },
  ]
  return seq.map((e, i) => ({ ...e, ts: t - (seq.length - i) * 60000 }))
}
