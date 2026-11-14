import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { byId } from '../data'
import { useApp } from '../store.jsx'
import ShowPicker from '../components/ShowPicker.jsx'
const REVIEWS = [['Ananya', 5, 'Loved every minute. Go for the biggest screen.'], ['Rahul', 4, 'Great story and music, slightly long.'], ['Sameer', 4, 'Solid performances all around.']]
export default function Details() {
  const { id } = useParams(); const m = byId(id); const { track } = useApp(); const [trailer, setTrailer] = useState(false)
  useEffect(() => { if (m) track('view', { movieId: m.id }) }, [id])
  if (!m) return <div className="wrap"><h1>Movie not found</h1><Link to="/movies" className="btn">Browse movies</Link></div>
  return (<>
    <section className="mhero" style={{ background: m.bg }}>
      <div className="mposter" style={{ background: m.bg }}>{m.title}</div>
      <div>
        <h1>{m.title}</h1>
        <p>{m.genres.join(', ')} · {m.dur} · {m.lang}</p>
        <p><b>{m.rating ? `★ ${m.rating}/10` : `Releases ${m.release}`}</b> · {m.formats.join(', ')}</p>
        <p className="syn">{m.syn}</p>
        <button className="btn" onClick={() => { setTrailer(true); track('trailer', { movieId: m.id }) }}>▶ Watch trailer</button>
      </div>
    </section>
    <div className="wrap">
      {trailer && <div className="modal" onClick={() => setTrailer(false)}><div className="player" style={{ background: m.bg }}><h3>{m.title} – Official Trailer</h3><p>Trailer preview (demo)</p><button className="btn">Close</button></div></div>}
      <h2>Gallery</h2>
      <div className="gal">{[0, 1, 2].map(i => <div key={i} style={{ background: m.bg, filter: `hue-rotate(${i * 40}deg)` }}>Still {i + 1}</div>)}</div>
      <h2>Cast</h2>
      <div className="chips">{m.cast.map(c => <span key={c} className="chip">{c}</span>)}</div>
      <h2>Reviews</h2>
      <div className="feat">{REVIEWS.map(([n, s, t]) => <div key={n} className="offer"><b>{n} · {'★'.repeat(s)}</b><p>{t}</p></div>)}</div>
      {m.status === 'now' ? <ShowPicker movie={m} /> : <p className="empty">Bookings open closer to the release date, {m.release}.</p>}
    </div>
  </>)
}
