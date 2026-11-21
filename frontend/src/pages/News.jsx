import { Link, useParams } from 'react-router-dom'
import { NEWS } from '../data'
export function NewsList() {
  return <div className="wrap"><h1>Movie news &amp; blog</h1><div className="feat">{NEWS.map(n => <Link key={n.id} to={`/news/${n.id}`} className="offer"><b>{n.title}</b><p className="dim">{n.date}</p><p>{n.body.slice(0, 90)}…</p></Link>)}</div></div>
}
export function NewsDetail() {
  const n = NEWS.find(x => x.id === +useParams().id)
  if (!n) return <div className="wrap"><h1>Article not found</h1><Link to="/news" className="btn">Back to news</Link></div>
  return <div className="wrap narrow"><Link to="/news">← All news</Link><h1>{n.title}</h1><p className="dim">{n.date}</p><p>{n.body}</p>
    <h2>More stories</h2>{NEWS.filter(x => x.id !== n.id).slice(0, 2).map(x => <p key={x.id}><Link to={`/news/${x.id}`}>{x.title}</Link></p>)}</div>
}
