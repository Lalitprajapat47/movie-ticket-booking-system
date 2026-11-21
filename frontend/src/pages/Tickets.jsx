import { Link } from 'react-router-dom'
import { useApp } from '../store.jsx'
import { api } from '../api.js'
export default function Tickets() {
  const { tickets, setTickets } = useApp()
  return (
    <div className="wrap"><h1>My tickets</h1>
      {tickets.length === 0 ? <p className="empty">No bookings yet. <Link to="/movies">Find a movie</Link> to book your first ticket.</p> :
        <div className="feat">{tickets.map(t => <div key={t.id} className="ticket"><b>{t.title}</b><p>{t.cinema}, {t.city}</p><p>{t.date} · {t.time} · {t.fmt}</p><p>Seats: {t.seats.join(', ')}</p><p>₹{t.total} · {t.pay}</p><code>{t.id}</code>
          <button className="btn alt" onClick={() => api('/bookings/' + t.id, { method: 'DELETE' }).catch(() => {}).finally(() => setTickets(x => x.filter(y => y.id !== t.id)))}>Cancel ticket</button></div>)}</div>}
    </div>
  )
}
