// src/components/VistaIngrediente.jsx
import React, { useEffect, useState } from 'react';
import { loadAllData } from '../utils/data';

export default function VistaIngrediente({ platoId }) {
  const [plato, setPlato] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    let mounted = true;
    async function fetchPlato() {
      const { ensaladas, piqueos, entradas } = await loadAllData();
      const all = [...ensaladas, ...piqueos, ...entradas];
      const p = all.find(x => x.id === platoId);
      if (mounted) setPlato(p || null);
    }
    fetchPlato();
    return () => { mounted = false; };
  }, [platoId]);

  if (!plato) return <div>Plato no encontrado.</div>;

  function toggle(idx) {
    setExpanded(e => ({ ...e, [idx]: !e[idx] }));
  }

  function copyAll() {
    const flat = flatten(plato.ingredientes || []).map(i => i.nombre).join(', ');
    navigator.clipboard.writeText(flat);
    alert('Ingredientes copiados');
  }

  return (
    <div>
      <h2>{plato.plato}</h2>
      <button onClick={copyAll} style={{marginBottom:12}}>Copiar todo</button>
      <ul>
        {plato.ingredientes.map((ing, idx) => (
          <li key={idx} style={{marginBottom:8}}>
            {ing.tipo === 'componente' ? (
              <div>
                <strong onClick={() => toggle(idx)} style={{cursor:'pointer'}}>{ing.nombre} ▾</strong>
                {expanded[idx] && (
                  <ul style={{marginTop:6}}>
                    {ing.ingredientes.map((s,i) => <li key={i}>{s.nombre}</li>)}
                  </ul>
                )}
              </div>
            ) : (
              <span>{ing.nombre}{ing.cantidad ? ` — ${ing.cantidad} ${ing.unidad || ''}` : ''}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function flatten(list = []) {
  const out = [];
  function rec(arr) {
    for (const it of arr) {
      if (it.tipo === 'componente' && Array.isArray(it.ingredientes)) rec(it.ingredientes);
      else out.push(it);
    }
  }
  rec(list);
  return out;
}