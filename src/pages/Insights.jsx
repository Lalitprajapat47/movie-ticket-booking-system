import { Link } from 'react-router-dom'
import { useApp } from '../store.jsx'
import { analyze, demoEvents, STAGES, stageLabel } from '../ai'
import MovieCard from '../components/MovieCard.jsx'
const Bars = ({ title, rows, empty = 'No data yet' }) => {
  const max = rows[0]?.[1] || 1
  return <div className="panel"><h3>{title}</h3>{rows.length ? rows.map(([k, v]) => <div key={k} className="bar"><span>{k}</span><i style={{ width: `${(v / max) * 100}%` }} /></div>) : <p className="dim">{empty}</p>}</div>
}
export default function Insights() {
  const { events, setEvents } = useApp(); const a = analyze(events)
  return (
    <div className="wrap">
      <h1>Your viewing insights</h1>
      <p className="dim">Built from your activity in this app: {a.total} events tracked.</p>
      <div className="chips"><button className="btn" onClick={() => setEvents(demoEvents())}>Load demo activity</button><button className="btn alt" onClick={() => setEvents([])}>Clear activity</button></div>
      <div className="panel"><h3>Your journey</h3>
        <div className="journey">{STAGES.map((s, i) => <span key={s} className={i <= a.reached ? 'step on' : 'step'}>{stageLabel(s)}</span>)}</div>
      </div>
      <div className="two eq">
        <div className="panel"><h3>Booking intent</h3><div className="meter"><i style={{ width: a.intent + '%' }} /></div><p><b>{a.intentLabel}</b> · {a.intent}% of the booking journey reached</p></div>
        <div className="panel"><h3>Movie-interest summary</h3><p>{a.summary}</p></div>
      </div>
      <h2>Recommended for you</h2>
      <div className="grid">{a.recs.map(r => <MovieCard key={r.m.id} m={r.m} match={a.total ? r.match : null} />)}</div>
      <div className="two eq">
        <Bars title="Preferred genres" rows={a.genres} /><Bars title="Frequently viewed movies" rows={a.movies} />
        <Bars title="Preferred languages" rows={a.langs} /><Bars title="Preferred formats" rows={a.fmts} />
        <Bars title="Frequently selected cinemas" rows={a.cinemas} /><Bars title="Preferred showtime patterns" rows={a.slots} />
      </div>
      {!a.total && <p className="empty">Nothing tracked yet. <Link to="/movies">Browse movies</Link> or load demo activity above.</p>}
    </div>
  )
}
