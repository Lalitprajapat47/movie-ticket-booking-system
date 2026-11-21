const g = (a, b) => `linear-gradient(150deg,${a},${b})`
export const CITIES = ['Ajmer', 'Jaipur', 'Delhi', 'Mumbai']
export const GENRES = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Animation', 'Horror']
export const LANGS = ['English', 'Hindi', 'Tamil']
export const FORMATS = ['2D', '3D', 'IMAX']
const L = (t) => `${t} A gripping story with strong performances, stunning visuals and a memorable score.`
export const MOVIES = [
  { id: 1, title: 'Neon Horizon', genres: ['Sci-Fi', 'Action'], lang: 'English', formats: ['2D', '3D', 'IMAX'], rating: 8.4, status: 'now', dur: '2h 28m', cast: ['Aarav Kapoor', 'Mia Chen', 'Rohan Das'], bg: g('#1d4ed8', '#9333ea'), syn: L('A rogue pilot races to stop a rogue AI from rewriting the sky.') },
  { id: 2, title: 'Dil Ki Gali', genres: ['Romance', 'Drama'], lang: 'Hindi', formats: ['2D'], rating: 7.9, status: 'now', dur: '2h 15m', cast: ['Kiara Sen', 'Vikram Rao', 'Neha Joshi'], bg: g('#be185d', '#f59e0b'), syn: L('Two strangers in old Jaipur find love through a lost letter.') },
  { id: 3, title: 'Last Laugh Club', genres: ['Comedy'], lang: 'Hindi', formats: ['2D'], rating: 7.2, status: 'now', dur: '2h 02m', cast: ['Manav Gill', 'Pooja Iyer', 'Sunil Verma'], bg: g('#ea580c', '#facc15'), syn: L('A failing stand-up club must win one big night to survive.') },
  { id: 4, title: 'The Hollow Hour', genres: ['Horror', 'Thriller'], lang: 'English', formats: ['2D', 'IMAX'], rating: 7.6, status: 'now', dur: '1h 54m', cast: ['Ella Ward', 'Jack Moreno', 'Sia Patel'], bg: g('#0f172a', '#7f1d1d'), syn: L('A night-shift nurse hears a clock that strikes thirteen.') },
  { id: 5, title: 'Paper Kites', genres: ['Animation', 'Comedy'], lang: 'English', formats: ['2D', '3D'], rating: 8.1, status: 'now', dur: '1h 41m', cast: ['Voices: Leo Park', 'Anya Roy', 'Tom Ellis'], bg: g('#0ea5e9', '#86efac'), syn: L('A kite maker and a stray cat chase the biggest festival wind.') },
  { id: 6, title: 'Raftaar', genres: ['Action', 'Thriller'], lang: 'Hindi', formats: ['2D', '3D', 'IMAX'], rating: 8.0, status: 'now', dur: '2h 40m', cast: ['Aditya Rathore', 'Sana Khan', 'Imran Ali'], bg: g('#b91c1c', '#111827'), syn: L('An ex-racer is pulled into a cross-country smuggling chase.') },
  { id: 7, title: 'Vaanam Thedi', genres: ['Drama', 'Romance'], lang: 'Tamil', formats: ['2D', 'IMAX'], rating: 8.3, status: 'now', dur: '2h 33m', cast: ['Karthik Raja', 'Divya Menon', 'Surya Pillai'], bg: g('#047857', '#0e7490'), syn: L('A village teacher chases a dream across the monsoon coast.') },
  { id: 8, title: 'Quantum Heist', genres: ['Sci-Fi', 'Thriller'], lang: 'English', formats: ['2D', '3D', 'IMAX'], rating: 0, status: 'upcoming', dur: '2h 10m', cast: ['Nora Blake', 'Dev Malhotra', 'Ian Cho'], bg: g('#4338ca', '#06b6d4'), release: '28 Nov 2026', syn: L('A crew steals one minute of time from the world’s richest vault.') },
  { id: 9, title: 'Shaadi No. 420', genres: ['Comedy', 'Romance'], lang: 'Hindi', formats: ['2D'], rating: 0, status: 'upcoming', dur: '2h 20m', cast: ['Riya Kapoor', 'Arjun Bedi', 'Sonal Mehta'], bg: g('#c026d3', '#f97316'), release: '05 Dec 2026', syn: L('Three wedding crashers get invited to the wrong shaadi.') },
  { id: 10, title: 'Iron Monsoon', genres: ['Action', 'Drama'], lang: 'Tamil', formats: ['2D', '3D'], rating: 0, status: 'upcoming', dur: '2h 36m', cast: ['Vijay Kumar', 'Lakshmi Das', 'Raj Anand'], bg: g('#334155', '#0ea5e9'), release: '19 Dec 2026', syn: L('A dam engineer defends a city from the storm of the century.') },
]
export const CINEMAS = [
  { id: 1, name: 'PVR Pacific Mall', city: 'Ajmer' }, { id: 2, name: 'Cinepolis Ajmer Central', city: 'Ajmer' },
  { id: 3, name: 'INOX Crystal Palm', city: 'Jaipur' }, { id: 4, name: 'PVR World Trade Park', city: 'Jaipur' },
  { id: 5, name: 'PVR Select Citywalk', city: 'Delhi' }, { id: 6, name: 'INOX Nehru Place', city: 'Delhi' },
  { id: 7, name: 'PVR Icon Andheri', city: 'Mumbai' }, { id: 8, name: 'Cinepolis Viviana', city: 'Mumbai' },
]
export const SHOWS = [{ t: '10:30 AM', f: '2D' }, { t: '01:45 PM', f: '3D' }, { t: '05:00 PM', f: '2D' }, { t: '08:15 PM', f: 'IMAX' }, { t: '10:45 PM', f: '2D' }]
export const SEAT_CATS = { Silver: { rows: 'ABC', price: 150 }, Gold: { rows: 'DEF', price: 250 }, Premium: { rows: 'GH', price: 400 } }
export const COUPONS = { FIRST50: 0.1, MOVIE20: 0.2 }
export const OFFERS = [
  { code: 'FIRST50', t: '10% off your first booking', d: 'Use FIRST50 at checkout.' },
  { code: 'MOVIE20', t: '20% off weekend shows', d: 'Use MOVIE20 on any Sat/Sun show.' },
  { code: 'COMBO', t: 'Popcorn + drink combo ₹199', d: 'Add at the cinema counter.' },
]
export const NEWS = [
  { id: 1, title: 'Neon Horizon breaks opening-week records', date: '10 Nov 2026', body: 'Neon Horizon has crossed expectations in its opening week, with IMAX screens running full from the first show. Critics praise its practical effects and a haunting score. Audiences in Jaipur and Mumbai are booking the 8:15 PM IMAX show well ahead.' },
  { id: 2, title: 'Five upcoming films to watch this winter', date: '08 Nov 2026', body: 'From the time-bending Quantum Heist to the wedding-farce Shaadi No. 420, the winter slate is stacked. We look at what makes each film worth a ticket and which format suits it best.' },
  { id: 3, title: 'IMAX vs 3D: which format should you pick?', date: '02 Nov 2026', body: 'IMAX gives the biggest picture and sound, while 3D works best for animation and action. For dialogue-driven dramas, a standard 2D show is usually all you need.' },
  { id: 4, title: 'Behind the scenes of Paper Kites', date: '28 Oct 2026', body: 'The animation team spent two years hand-painting the festival skies. Here is how the film’s world was built frame by frame.' },
]
export const byId = (id) => MOVIES.find(m => m.id === Number(id))
export const dates = () => Array.from({ length: 5 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return { key: d.toISOString().slice(0, 10), label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) } })
