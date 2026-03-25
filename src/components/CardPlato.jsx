// src/components/CardPlato.jsx
import React from 'react';

export default function CardPlato({ plato, onStartStudy, onViewIngredients }) {
  async function handleCopy() {
    try {
      const res = await fetch(`/data/${categoriaToFile(plato.id)}.json`);
      // fallback: copy only name if file not found
      const text = plato.plato;
      await navigator.clipboard.writeText(text);
      alert('Ingredientes copiados al portapapeles');
    } catch (e) {
      await navigator.clipboard.writeText(plato.plato);
      alert('Nombre copiado (no se pudo obtener ingredientes).');
    }
  }

  return (
    <div style={{border:'1px solid #e6e6e6', borderRadius:8, padding:12, background:'#fff'}}>
      <h4 style={{margin:'0 0 8px 0'}}>{plato.plato}</h4>
      <p style={{margin:'0 0 12px 0'}}><strong>{plato.ingredientesCount}</strong> ingredientes</p>
      <div style={{display:'flex', gap:8}}>
        <button onClick={onViewIngredients} style={btnStyle}>Ver ingredientes</button>
        <button onClick={onStartStudy} style={btnStyle}>Modo Estudio</button>
        <button onClick={handleCopy} style={btnStyle}>Copiar</button>
      </div>
    </div>
  );
}

function categoriaToFile(id) {
  // heurística simple para intentar localizar el JSON si se quisiera
  if (id.startsWith('ensalada')) return 'ensaladas';
  if (id.startsWith('piqueo') || id.startsWith('plato')) return 'piqueos';
  return 'entradas';
}

const btnStyle = {
  padding:'6px 8px',
  borderRadius:6,
  border:'1px solid #ddd',
  background:'#fafafa',
  cursor:'pointer'
};