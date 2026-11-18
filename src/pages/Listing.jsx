import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard.jsx'
import { MOVIES, GENRES, LANGS, FORMATS } from '../data'
import { useApp } from '../store.jsx'
const PER = 8
const Group = ({ title, opts, val, on }) => (
  <div className="fg"><h4>{title}</h4>
    <div className="chips">{opts.map(o => <button type="button" key={o} className={val === o ? 'chip on' : 'chip'} onClick={() => on(val === o ? '' : o)}>{o}</button>)}</div>
  </div>)
const EMPTY = { genre: '', lang: '', fmt: '', rating: 0, status: '' }
export default function Listing() {
  const [sp] = useSearchParams(); const { track, city } = useApp()
  const [f, setF] = useState({ ...EMPTY, genre: sp.get('genre') || '' })
  const [q, setQ] = useState(sp.get('q') || ''); const [sort, setSort] = useState('rating'); const [page, setPage] = useState(1)
  useEffect(() => { setQ(sp.get('q') || ''); setF(x => ({ ...x, genre: sp.get('genre') || x.genre })); setPage(1) }, [sp])
  const set = (k, v) => { setF({ ...f, [k]: v }); setPage(1); if (k === 'genre' && v) track('genre', { genre: v }) }
  let list = MOVIES.filter(m => (!f.genre || m.genres.includes(f.genre)) && (!f.lang || m.lang === f.lang) && (!f.fmt || m.formats.includes(f.fmt)) &&
    m.rating >= f.rating && (!f.status || m.status === f.status) && (!q || (m.title + m.genres.join()).toLowerCase().includes(q.toLowerCase())))
  list = [...list].sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : b.rating - a.rating)
  const pages = Math.max(1, Math.ceil(list.length / PER))
  const clear = () => { setF(EMPTY); setQ(''); setPage(1) }
  return (
    <div className="wrap">
      <p className="dim">Home › Movies</p>
      <h1>Movies in {city}</h1>
      <div className="lay">
        <aside className="side panel">
          <div className="fh"><h3>Filters</h3><button className="lnk" onClick={clear}>Clear all</button></div>
          <Group title="Language" opts={LANGS} val={f.lang} on={v => set('lang', v)} />
          <Group title="Genres" opts={GENRES} val={f.genre} on={v => set('genre', v)} />
          <Group title="Format" opts={FORMATS} val={f.fmt} on={v => set('fmt', v)} />
          <Group title="Rating" opts={['7+', '8+']} val={f.rating ? `${f.rating}+` : ''} on={v => set('rating', v ? parseInt(v) : 0)} />
          <Group title="Release status" opts={['Now showing', 'Upcoming']} val={f.status === 'now' ? 'Now showing' : f.status === 'upcoming' ? 'Upcoming' : ''} on={v => set('status', v === 'Now showing' ? 'now' : v === 'Upcoming' ? 'upcoming' : '')} />
        </aside>
        <div>
          <form className="lbar" onSubmit={e => { e.preventDefault(); if (q.trim()) track('search', { q: q.trim() }); setPage(1) }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search title or genre" aria-label="Search" />
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort"><option value="rating">Top rated</option><option value="title">A–Z</option></select>
          </form>
          <p className="dim">{list.length} movie{list.length !== 1 && 's'} found</p>
          {list.length ? <div className="grid">{list.slice((page - 1) * PER, page * PER).map(m => <MovieCard key={m.id} m={m} />)}</div>
            : <p className="empty">No movies match these filters. Click “Clear all” to see every movie.</p>}
          <div className="pager"><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button></div>
        </div>
      </div>
    </div>
  )
}