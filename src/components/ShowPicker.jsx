import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store.jsx'
import { CINEMAS, SHOWS, dates } from '../data'
export default function ShowPicker({ movie }) {
  const { city, track } = useApp(); const nav = useNavigate()
  const D = dates(); const [d, setD] = useState(D[0].key)
  const cin = CINEMAS.filter(c => c.city === city)
  const shows = SHOWS.filter(s => movie.formats.includes(s.f))
  return (
    <section>
      <h2>Cinemas &amp; showtimes in {city}</h2>
      <div className="chips">{D.map(x => <button key={x.key} className={d === x.key ? 'chip on' : 'chip'} onClick={() => setD(x.key)}>{x.label}</button>)}</div>
      {cin.map(c => (
        <div className="cin" key={c.id}>
          <h4>{c.name}</h4>
          <div className="chips">{shows.map(s => (
            <button key={s.t} className="show" onClick={() => {
              track('cinema', { movieId: movie.id, cinema: c.name }); track('showtime', { movieId: movie.id, time: s.t, fmt: s.f })
              nav(`/book/${movie.id}?c=${c.id}&d=${d}&t=${encodeURIComponent(s.t)}&f=${s.f}`)
            }}>{s.t}<small>{s.f}</small></button>))}</div>
        </div>))}
    </section>
  )
}
