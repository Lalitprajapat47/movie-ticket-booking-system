import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import { MOVIES, GENRES, LANGS, FORMATS } from '../data'
import { useApp } from '../store.jsx'
const PER = 6
export default function Listing() {
  const [sp, setSp] = useSearchParams(); const { track, city } = useApp()
  const [f, setF] = useState({ genre: sp.get('genre') || '', lang: '', fmt: '', rating: 0, status: '' })
  const [q, setQ] = useState(sp.get('q') || ''); const [sort, setSort] = useState('rating'); const [page, setPage] = useState(1)
  useEffect(() => { setQ(sp.get('q') || ''); setF(x => ({ ...x, genre: sp.get('genre') || x.genre })); setPage(1) }, [sp])
  const set = (k, v) => { setF({ ...f, [k]: v }); setPage(1); if (k === 'genre' && v) track('genre', { genre: v }) }
  let list = MOVIES.filter(m => (!f.genre || m.genres.includes(f.genre)) && (!f.lang || m.lang === f.lang) && (!f.fmt || m.formats.includes(f.fmt)) &&
    m.rating >= f.rating && (!f.status || m.status === f.status) && (!q || (m.title + m.genres.join()).toLowerCase().includes(q.toLowerCase())))
  list = [...list].sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : b.rating - a.rating)
  const pages = Math.max(1, Math.ceil(list.length / PER))
  const Sel = ({ k, label, opts }) => <label>{label}<select value={f[k]} onChange={e => set(k, e.target.value)}><option value="">All</option>{opts.map(o => <option key={o}>{o}</option>)}</select></label>
  return (
    <div className="wrap">
      <h1>Movies in {city}</h1>
      <form className="filters" onSubmit={e => { e.preventDefault(); if (q.trim()) track('search', { q: q.trim() }); setPage(1) }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search title or genre" aria-label="Search" />
        <Sel k="genre" label="Genre" opts={GENRES} /><Sel k="lang" label="Language" opts={LANGS} /><Sel k="fmt" label="Format" opts={FORMATS} />
        <label>Rating<select value={f.rating} onChange={e => set('rating', +e.target.value)}><option value={0}>Any</option><option value={7}>7+</option><option value={8}>8+</option></select></label>
        <label>Status<select value={f.status} onChange={e => set('status', e.target.value)}><option value="">All</option><option value="now">Now showing</option><option value="upcoming">Upcoming</option></select></label>
        <label>Sort<select value={sort} onChange={e => setSort(e.target.value)}><option value="rating">Top rated</option><option value="title">A–Z</option></select></label>
        <button className="btn">Search</button>
      </form>
      {list.length ? <div className="grid">{list.slice((page - 1) * PER, page * PER).map(m => <MovieCard key={m.id} m={m} />)}</div>
        : <p className="empty">No movies match these filters. Clear a filter to see more.</p>}
      <div className="pager"><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button></div>
    </div>
  )
}
