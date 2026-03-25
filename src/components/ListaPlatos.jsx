// src/components/ListaPlatos.jsx
import React, { useEffect, useState } from 'react';
import CardPlato from './CardPlato';
import { loadAllData, expandirIngredientes } from '../utils/data';

export default function ListaPlatos({ categoria = 'ensaladas', onStartStudy, onViewIngredients }) {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const { ensaladas, piqueos, entradas } = await loadAllData();
      const lista = categoria === 'ensaladas' ? ensaladas : categoria === 'piqueos' ? piqueos : entradas;
      const mapped = lista.map(p => {
        const expand = expandirIngredientes(p.ingredientes || []);
        return { id: p.id, plato: p.plato, porciones: p.porciones, ingredientesCount: expand.length };
      });
      if (mounted) {
        setPlatos(mapped);
        setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [categoria]);

  if (loading) return <div>Cargando platos...</div>;
  if (!platos.length) return <div>No hay platos en esta categoría.</div>;

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12}}>
      {platos.map(p => (
        <CardPlato
          key={p.id}
          plato={p}
          onStartStudy={() => onStartStudy && onStartStudy(p.id)}
          onViewIngredients={() => onViewIngredients && onViewIngredients(p.id)}
        />
      ))}
    </div>
  );
}