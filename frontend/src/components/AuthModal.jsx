import { useState } from 'react'
import { api } from '../api.js'
import { useApp } from '../store.jsx'
export default function AuthModal({ onClose }) {
  const { login } = useApp()
  const [mode, setMode] = useState('login'), [f, setF] = useState({ name: '', email: '', password: '' }), [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async e => {
    e.preventDefault(); setErr(''); setBusy(true)
    try { login(await api(`/auth/${mode === 'login' ? 'login' : 'register'}`, { method: 'POST', body: f })); onClose() }
    catch (x) { setErr(x.status ? x.message : 'Cannot reach the server. Start the backend: cd backend → npm start') }
    setBusy(false)
  }
  return (
    <div className="modal" onClick={onClose}>
      <form className="cities auth" onClick={e => e.stopPropagation()} onSubmit={submit}>
        <h3>{mode === 'login' ? 'Sign in to CineBook' : 'Create your account'}</h3>
        <div className="tabs">
          <button type="button" className={mode === 'login' ? 'chip on' : 'chip'} onClick={() => { setMode('login'); setErr('') }}>Sign in</button>
          <button type="button" className={mode === 'register' ? 'chip on' : 'chip'} onClick={() => { setMode('register'); setErr('') }}>Sign up</button>
        </div>
        {mode === 'register' && <input value={f.name} onChange={set('name')} placeholder="Full name" aria-label="Full name" autoFocus />}
        <input type="email" value={f.email} onChange={set('email')} placeholder="Email" aria-label="Email" autoFocus={mode === 'login'} />
        <input type="password" value={f.password} onChange={set('password')} placeholder="Password (min 6 characters)" aria-label="Password" />
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn full" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
    </div>
  )
}