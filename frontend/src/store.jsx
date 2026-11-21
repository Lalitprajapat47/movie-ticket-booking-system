import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from './api.js'
const Ctx = createContext()
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export function Provider({ children }) {
  const [events, setEvents] = useState(() => load('cb_ev', []))
  const [tickets, setTickets] = useState(() => load('cb_tk', []))
  const [city, setCity] = useState(() => load('cb_city', 'Ajmer'))
  useEffect(() => localStorage.setItem('cb_ev', JSON.stringify(events)), [events])
  useEffect(() => localStorage.setItem('cb_tk', JSON.stringify(tickets)), [tickets])
  useEffect(() => localStorage.setItem('cb_city', JSON.stringify(city)), [city])
  // server is the source of truth when it is running; local copy is the fallback
  useEffect(() => { api('/bookings').then(setTickets).catch(() => {}); api('/events').then(setEvents).catch(() => {}) }, [])
  const track = useCallback((type, data = {}) => {
    const e = { type, ...data, ts: Date.now() }
    setEvents(x => [...x, e]); api('/events', { method: 'POST', body: e }).catch(() => {})
  }, [])
  return <Ctx.Provider value={{ events, setEvents, tickets, setTickets, city, setCity, track }}>{children}</Ctx.Provider>
}
export const useApp = () => useContext(Ctx)
