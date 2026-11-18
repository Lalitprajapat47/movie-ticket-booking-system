import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from './store.jsx'
import { CITIES } from './data'
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
  const { city, setCity } = useApp()
  return (
    <header className="hdr">
      <div className="hin">
        <Link to="/" className="logo">Cine<b>Book</b></Link>
        <nav>
          {[['/', 'Home'], ['/movies', 'Movies'], ['/showtimes', 'Showtimes'], ['/insights', 'For You'], ['/tickets', 'My Tickets'], ['/news', 'News'], ['/about', 'About']].map(([to, l]) =>
            <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}
        </nav>
        <select aria-label="City" value={city} onChange={e => setCity(e.target.value)}>{CITIES.map(c => <option key={c}>{c}</option>)}</select>
      </div>
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