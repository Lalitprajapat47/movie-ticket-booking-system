import { useParams, useNavigate } from 'react-router-dom'
import { MOVIES, byId } from '../data'
import ShowPicker from '../components/ShowPicker.jsx'
export default function Showtimes() {
  const { id } = useParams(); const nav = useNavigate(); const now = MOVIES.filter(m => m.status === 'now'); const m = byId(id) || now[0]
  return (
    <div className="wrap">
      <h1>Cinema &amp; showtimes</h1>
      <label className="inl">Movie <select value={m.id} onChange={e => nav(`/showtimes/${e.target.value}`)}>{now.map(x => <option key={x.id} value={x.id}>{x.title}</option>)}</select></label>
      <p className="dim">{m.genres.join(', ')} · {m.lang} · {m.dur}</p>
      <ShowPicker key={m.id} movie={m} />
    </div>
  )
}
