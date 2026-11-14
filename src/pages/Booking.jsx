import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { byId, CINEMAS, SEAT_CATS, COUPONS } from '../data'
import { useApp } from '../store.jsx'
const ROWS = 'ABCDEFGH'.split(''), COLS = Array.from({ length: 10 }, (_, i) => i + 1)
const catOf = r => Object.entries(SEAT_CATS).find(([, v]) => v.rows.includes(r))[0]
const taken = (r, n) => (ROWS.indexOf(r) * 7 + n * 3) % 5 === 0
export default function Booking() {
  const { id } = useParams(); const [sp] = useSearchParams(); const nav = useNavigate(); const { track, setTickets } = useApp()
  const m = byId(id); const cin = CINEMAS.find(c => c.id === +sp.get('c')); const date = sp.get('d'), time = sp.get('t'), fmt = sp.get('f')
  const [qty, setQty] = useState(2), [sel, setSel] = useState([]), [cat, setCat] = useState('All'), [code, setCode] = useState(''), [off, setOff] = useState(0), [msg, setMsg] = useState(''), [pay, setPay] = useState('UPI'), [done, setDone] = useState(null)
  useEffect(() => { if (sel.length && sel.length === qty) track('intent', { movieId: +id }) }, [sel.length === qty && sel.length > 0])
  if (!m || !cin) return <div className="wrap"><h1>Choose a showtime first</h1><button className="btn" onClick={() => nav('/showtimes')}>Pick showtime</button></div>
  const toggle = s => {
    if (sel.includes(s)) return setSel(sel.filter(x => x !== s))
    if (sel.length >= qty) return setMsg(`You can select ${qty} seat${qty > 1 ? 's' : ''}. Increase ticket quantity to add more.`)
    setMsg(''); setSel([...sel, s]); track('seat', { movieId: m.id })
  }
  const sub = sel.reduce((a, s) => a + SEAT_CATS[catOf(s[0])].price, 0), total = Math.round(sub * (1 - off))
  const apply = () => { const v = COUPONS[code.trim().toUpperCase()]; if (v) { setOff(v); setMsg(`Coupon applied: ${v * 100}% off`) } else { setOff(0); setMsg('Invalid coupon. Try FIRST50 or MOVIE20.') } }
  const confirm = () => {
    const t = { id: 'CB' + Date.now().toString().slice(-7), movieId: m.id, title: m.title, cinema: cin.name, city: cin.city, date, time, fmt, seats: sel, total, pay }
    setTickets(x => [t, ...x]); track('booking', { movieId: m.id }); setDone(t)
  }
  if (done) return <div className="wrap center"><h1>Booking confirmed 🎉</h1><div className="ticket"><b>{done.title}</b><p>{done.cinema}, {done.city}</p><p>{done.date} · {done.time} · {done.fmt}</p><p>Seats: {done.seats.join(', ')}</p><p>Paid ₹{done.total} via {done.pay}</p><code>{done.id}</code></div><button className="btn" onClick={() => nav('/tickets')}>View my tickets</button></div>
  return (
    <div className="wrap">
      <h1>{m.title}</h1><p className="dim">{cin.name} · {date} · {time} · {fmt}</p>
      <div className="two">
        <div>
          <div className="chips"><label className="inl">Tickets <select value={qty} onChange={e => { setQty(+e.target.value); setSel([]) }}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></label>
            {['All', ...Object.keys(SEAT_CATS)].map(c => <button key={c} className={cat === c ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{c}{c !== 'All' && ` ₹${SEAT_CATS[c].price}`}</button>)}</div>
          <div className="screen">Screen this way</div>
          <div className="seats">{ROWS.map(r => <div key={r} className="row"><span>{r}</span>{COLS.map(n => {
            const s = r + n, tk = taken(r, n), dim = cat !== 'All' && catOf(r) !== cat
            return <button key={s} aria-label={`Seat ${s} ${catOf(r)}`} disabled={tk || dim} onClick={() => toggle(s)} className={`seat c${catOf(r)} ${tk ? 'tk' : ''} ${sel.includes(s) ? 'sel' : ''}`} />
          })}</div>)}</div>
          <p className="legend dim">Available · Selected · Booked</p>
        </div>
        <aside className="sum">
          <h3>Booking summary</h3>
          <p>Seats: {sel.length ? sel.join(', ') : 'none selected'}</p><p>Subtotal: ₹{sub}</p>
          <div className="cp"><input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon" /><button className="btn alt" onClick={apply}>Apply</button></div>
          {off > 0 && <p>Discount: −₹{sub - total}</p>}
          <h3>Total: ₹{total}</h3>
          <h4>Payment method</h4>
          {['UPI', 'Credit / Debit card', 'Net banking', 'Wallet'].map(p => <label key={p} className="radio"><input type="radio" checked={pay === p} onChange={() => setPay(p)} />{p}</label>)}
          {msg && <p className="note" role="status">{msg}</p>}
          <button className="btn full" disabled={sel.length !== qty} onClick={confirm}>{sel.length === qty ? `Pay ₹${total}` : `Select ${qty - sel.length} more seat${qty - sel.length > 1 ? 's' : ''}`}</button>
        </aside>
      </div>
    </div>
  )
}
