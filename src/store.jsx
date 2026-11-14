import { createContext, useContext, useEffect, useState, useCallback } from 'react'
const Ctx = createContext()
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export function Provider({ children }) {
  const [events, setEvents] = useState(() => load('cb_ev', []))
  const [tickets, setTickets] = useState(() => load('cb_tk', []))
  const [city, setCity] = useState(() => load('cb_city', 'Ajmer'))
  useEffect(() => localStorage.setItem('cb_ev', JSON.stringify(events)), [events])
  useEffect(() => localStorage.setItem('cb_tk', JSON.stringify(tickets)), [tickets])
  useEffect(() => localStorage.setItem('cb_city', JSON.stringify(city)), [city])
  const track = useCallback((type, data = {}) => setEvents(e => [...e, { type, ...data, ts: Date.now() }]), [])
  return <Ctx.Provider value={{ events, setEvents, tickets, setTickets, city, setCity, track }}>{children}</Ctx.Provider>
}
export const useApp = () => useContext(Ctx)
