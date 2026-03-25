const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchCategorias() {
  const r = await fetch(`${BASE}/api/categorias`);
  return r.json();
}
export async function fetchPlatos(categoria='ensaladas') {
  const r = await fetch(`${BASE}/api/platos?categoria=${categoria}`);
  return r.json();
}
export async function fetchPlato(id) {
  const r = await fetch(`${BASE}/api/platos/${id}`);
  return r.json();
}
export async function startStudySession(platoIds) {
  const r = await fetch(`${BASE}/api/study/session`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({platoIds})
  });
  return r.json();
}