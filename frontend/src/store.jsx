import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from './api.js'
const Ctx = createContext()
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export function Provider({ children }) {
  const [events, setEvents] = useState(() => load('cb_ev', []))
  const [tickets, setTickets] = useState(() => load('cb_tk', []))
  const [city, setCity] = useState(() => load('cb_city', 'Ajmer'))
  const [user, setUser] = useState(() => load('cb_user', null))
  useEffect(() => localStorage.setItem('cb_ev', JSON.stringify(events)), [events])
  useEffect(() => localStorage.setItem('cb_tk', JSON.stringify(tickets)), [tickets])
  useEffect(() => localStorage.setItem('cb_city', JSON.stringify(city)), [city])
  // server is the source of truth when it is running; reload whenever the user signs in or out
  useEffect(() => { api('/bookings').then(setTickets).catch(() => {}); api('/events').then(setEvents).catch(() => {}) }, [user?.id])
  const login = d => { localStorage.setItem('cb_token', d.token); localStorage.setItem('cb_user', JSON.stringify(d.user)); setUser(d.user) }
  const logout = () => { api('/auth/logout', { method: 'POST' }).catch(() => {}); localStorage.removeItem('cb_token'); localStorage.removeItem('cb_user'); setUser(null) }
  const track = useCallback((type, data = {}) => {
    const e = { type, ...data, ts: Date.now() }
    setEvents(x => [...x, e]); api('/events', { method: 'POST', body: e }).catch(() => {})
  }, [])
  return <Ctx.Provider value={{ events, setEvents, tickets, setTickets, city, setCity, user, login, logout, track }}>{children}</Ctx.Provider>
}
export const useApp = () => useContext(Ctx)