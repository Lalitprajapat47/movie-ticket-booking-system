import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import Poster from '../components/Poster.jsx'
import { MOVIES, GENRES, OFFERS, LANGS } from '../data'
import { useApp } from '../store.jsx'
const Row = ({ title, list, to }) => list.length ? (
  <section>
    <div className="rh"><h2>{title}</h2>{to && <Link to={to} className="more">See all ›</Link>}</div>
    <div className="hrow">{list.map(m => <div key={m.id} className="hi"><MovieCard m={m} /></div>)}</div>
  </section>) : null
export default function Home() {
  const { track, city } = useApp(); const nav = useNavigate(); const [q, setQ] = useState(''); const [i, setI] = useState(0)
  const now = MOVIES.filter(m => m.status === 'now'), up = MOVIES.filter(m => m.status === 'upcoming')
  const top = [...now].sort((a, b) => b.rating - a.rating), slides = top.slice(0, 4), s = slides[i]
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % 4), 4500); return () => clearInterval(t) }, [])
  const go = e => { e.preventDefault(); if (q.trim()) track('search', { q: q.trim() }); nav(`/movies?q=${encodeURIComponent(q)}`) }
  return (<>
    <section className="banner" style={{ background: s.bg }}>
      <div className="bw">
        <div className="bt">
          <p>Now showing in {city}</p><h1>{s.title}</h1>
          <p>{s.genres.join(' / ')} · {s.lang} · ★ {s.rating}</p><p className="bs">{s.syn}</p>
          <Link className="btn" to={`/movie/${s.id}`}>Book tickets</Link>
        </div>
        <Link to={`/movie/${s.id}`} className="bp" aria-label={s.title}><Poster m={s} /></Link>
      </div>
      <form className="bsearch" onSubmit={go}><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search a movie or genre" aria-label="Search movies" /><button className="btn">Search</button></form>
      <div className="dots">{slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} className={k === i ? 'dot on' : 'dot'} onClick={() => setI(k)} />)}</div>
    </section>
    <div className="wrap">
      <Row title="Recommended movies" list={top} to="/movies" />
      {LANGS.map(l => <Row key={l} title={`${l} movies`} list={now.filter(m => m.lang === l)} to="/movies" />)}
      <Row title="Coming soon" list={up} to="/movies" />
      <h2>Explore by genre</h2>
      <div className="chips">{GENRES.map(g => <Link key={g} className="chip" to={`/movies?genre=${g}`} onClick={() => track('genre', { genre: g })}>{g}</Link>)}</div>
      <h2>Featured</h2>
      <div className="feat">{top.slice(0, 3).map(m => <Link key={m.id} to={`/movie/${m.id}`} className="fcard" style={{ background: m.bg }}><h3>{m.title}</h3><p>{m.syn}</p><b>★ {m.rating}</b></Link>)}</div>
      <h2>Offers for you</h2>
      <div className="feat">{OFFERS.map(o => <div key={o.code} className="offer"><b>{o.t}</b><p>{o.d}</p></div>)}</div>
    </div>
  </>)
}
