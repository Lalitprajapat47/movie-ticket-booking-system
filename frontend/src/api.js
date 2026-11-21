const KEY = 'cb_cid'
export const clientId = () => {
  let id = localStorage.getItem(KEY)
  if (!id) { id = (crypto.randomUUID && crypto.randomUUID()) || String(Math.random()).slice(2); localStorage.setItem(KEY, id) }
  return id
}
export async function api(path, opts = {}) {
  const r = await fetch('/api' + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', 'x-client-id': clientId(), ...opts.headers },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: r.status, data })
  return data
}
