import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import { MOVIES, GENRES, OFFERS, byId } from '../data'
import Poster from '../components/Poster.jsx'
import { useApp } from '../store.jsx'
export default function Home() {
  const [q, setQ] = useState(''); const nav = useNavigate(); const { track, city } = useApp()
  const now = MOVIES.filter(m => m.status === 'now'), up = MOVIES.filter(m => m.status === 'upcoming')
  const feat = [...now].sort((a, b) => b.rating - a.rating).slice(0, 3)
  const go = e => { e.preventDefault(); if (q.trim()) track('search', { q: q.trim() }); nav(`/movies?q=${encodeURIComponent(q)}`) }
  return (<>
    <section className="hero">
      <div className="hp" aria-hidden="true">{[1, 6, 2, 7].map((id, i) => <div key={id} className={`hpc hp${i}`}><Poster m={byId(id)} /></div>)}</div>
      <h1>Tonight’s film,<br />your seat, sorted.</h1>
      <p>Showing now in {city}. Search a movie, pick a cinema, choose your seats.</p>
      <form onSubmit={go}><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search movies or genres" aria-label="Search movies" /><button className="btn">Search</button></form>
    </section>
    <div className="wrap">
      <h2>Now showing <Link to="/movies" className="more">See all</Link></h2>
      <div className="grid">{now.slice(0, 5).map(m => <MovieCard key={m.id} m={m} />)}</div>
      <h2>Upcoming releases</h2>
      <div className="grid">{up.map(m => <MovieCard key={m.id} m={m} />)}</div>
      <h2>Browse by genre</h2>
      <div className="chips">{GENRES.map(g => <Link key={g} className="chip" to={`/movies?genre=${g}`} onClick={() => track('genre', { genre: g })}>{g}</Link>)}</div>
      <h2>Featured</h2>
      <div className="feat">{feat.map(m => <Link key={m.id} to={`/movie/${m.id}`} className="fcard" style={{ background: m.bg }}><h3>{m.title}</h3><p>{m.syn}</p><b>★ {m.rating}</b></Link>)}</div>
      <h2>Offers</h2>
      <div className="feat">{OFFERS.map(o => <div key={o.code} className="offer"><b>{o.t}</b><p>{o.d}</p></div>)}</div>
    </div>
  </>)
}