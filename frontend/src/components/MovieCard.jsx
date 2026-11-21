import { Link } from 'react-router-dom'
import Poster from './Poster.jsx'
export default function MovieCard({ m, match }) {
  return (
    <Link to={`/movie/${m.id}`} className="card">
      <div className="poster" style={{ background: m.bg }}>
        <Poster m={m} />
        <span className="pt">{m.title}</span>
        {m.rating > 0 ? <span className="badge">★ {m.rating}</span> : <span className="badge">{m.release}</span>}
        {match && <span className="badge m">{match}% match</span>}
      </div>
      <div className="ci"><h3>{m.title}</h3><p>{m.genres.join(', ')}</p><p className="dim">{m.lang} · {m.formats.join('/')}</p></div>
    </Link>
  )
}
