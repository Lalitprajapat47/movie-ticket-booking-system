import { useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from './store.jsx'
import { CITIES } from './data'
import AuthModal from './components/AuthModal.jsx'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import Details from './pages/Details.jsx'
import Showtimes from './pages/Showtimes.jsx'
import Booking from './pages/Booking.jsx'
import Insights from './pages/Insights.jsx'
import Tickets from './pages/Tickets.jsx'
import About from './pages/About.jsx'
import { NewsList, NewsDetail } from './pages/News.jsx'

function Header() {
  const { city, setCity, track, user, logout } = useApp(); const nav = useNavigate(); const [auth, setAuth] = useState(false)
  const [q, setQ] = useState(''); const [open, setOpen] = useState(() => !localStorage.getItem('cb_cityset'))
  const pick = c => { setCity(c); localStorage.setItem('cb_cityset', '1'); setOpen(false) }
  const go = e => { e.preventDefault(); if (q.trim()) track('search', { q: q.trim() }); nav(`/movies?q=${encodeURIComponent(q)}`) }
  return (
    <header className="hdr">
      <div className="hin">
        <Link to="/" className="logo">Cine<b>Book</b></Link>
        <form className="hsearch" onSubmit={go}><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search for movies, genres and more" aria-label="Search movies" /><button aria-label="Search">🔍</button></form>
        <button className="citybtn" onClick={() => setOpen(true)}>📍 {city} ▾</button>
        {user ? <div className="usr"><span>Hi, {user.name.split(' ')[0]}</span><button className="btn sm alt" onClick={logout}>Sign out</button></div> : <button className="btn sm" onClick={() => setAuth(true)}>Sign in</button>}
      </div>
      <nav className="hnav"><div className="hn">
        {[['/', 'Home'], ['/movies', 'Movies'], ['/showtimes', 'Showtimes'], ['/insights', 'For You'], ['/tickets', 'My Tickets'], ['/news', 'News'], ['/about', 'About']].map(([to, l]) =>
          <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}
      </div></nav>
      {auth && <AuthModal onClose={() => setAuth(false)} />}
      {open && <div className="modal" onClick={() => setOpen(false)}>
        <div className="cities" onClick={e => e.stopPropagation()}>
          <h3>Select your city</h3>
          <div className="chips">{CITIES.map(c => <button key={c} className={c === city ? 'chip on' : 'chip'} onClick={() => pick(c)}>{c}</button>)}</div>
        </div>
      </div>}
    </header>
  )
}
const Footer = () => (
  <footer className="ftr">
    <div className="fin">
      <div><b className="flogo">CineBook</b><p>Book movie tickets in a few taps.</p></div>
      <div><h4>Explore</h4><Link to="/movies">Movies</Link><Link to="/showtimes">Showtimes</Link><Link to="/tickets">My Tickets</Link></div>
      <div><h4>Company</h4><Link to="/about">About us</Link><Link to="/news">News &amp; Blog</Link><Link to="/insights">Recommendations</Link></div>
    </div>
    <div className="fcopy">© 2026 CineBook. Frontend demo project.</div>
  </footer>
)
export default function App() {
  return (<>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Listing />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/showtimes/:id" element={<Showtimes />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="*" element={<div className="wrap"><h1>Page not found</h1><Link className="btn" to="/">Go to home</Link></div>} />
      </Routes>
    </main>
    <Footer />
  </>)
}