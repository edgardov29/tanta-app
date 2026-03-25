// src/App.jsx
import React, { useState } from 'react';
import ListaPlatos from './components/ListaPlatos';
import StudyMode from './components/StudyMode';
import VistaIngrediente from './components/VistaIngrediente';
import './index.css';

export default function App() {
  const [categoria, setCategoria] = useState('ensaladas');
  const [modo, setModo] = useState('lista'); // 'lista' | 'study' | 'ingredientes'
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  function handleStartStudy(platoId) {
    setPlatoSeleccionado(platoId);
    setModo('study');
  }

  function handleViewIngredients(platoId) {
    setPlatoSeleccionado(platoId);
    setModo('ingredientes');
  }

  return (
    <div style={{fontFamily:'Inter, system-ui, Arial', color:'#222'}}>
      <header style={{background:'#C62828', color:'#fff', padding:'16px 20px'}}>
        <h1 style={{margin:0}}>Tanta Estudio</h1>
      </header>

      <nav style={{display:'flex', gap:8, padding:12, borderBottom:'1px solid #eee'}}>
        <button onClick={() => { setCategoria('ensaladas'); setModo('lista'); }} style={navBtnStyle}>Ensaladas</button>
        <button onClick={() => { setCategoria('piqueos'); setModo('lista'); }} style={navBtnStyle}>Piqueos</button>
        <button onClick={() => { setCategoria('entradas'); setModo('lista'); }} style={navBtnStyle}>Entradas</button>
        <div style={{marginLeft:'auto'}}>
          <button onClick={() => { setModo('study'); setPlatoSeleccionado(null); }} style={secondaryBtnStyle}>Modo Estudio (toda la categoría)</button>
        </div>
      </nav>

      <main style={{padding:16}}>
        {modo === 'lista' && (
          <ListaPlatos
            categoria={categoria}
            onStartStudy={handleStartStudy}
            onViewIngredients={handleViewIngredients}
          />
        )}

        {modo === 'ingredientes' && platoSeleccionado && (
          <div>
            <button onClick={() => setModo('lista')} style={backBtnStyle}>← Volver</button>
            <VistaIngrediente platoId={platoSeleccionado} />
          </div>
        )}

        {modo === 'study' && (
          <div>
            <button onClick={() => setModo('lista')} style={backBtnStyle}>← Volver</button>
            <StudyMode categoria={categoria} />
          </div>
        )}
      </main>
    </div>
  );
}

const navBtnStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  borderRadius: 6
};

const secondaryBtnStyle = {
  padding: '8px 12px',
  border: 'none',
  background: '#fff',
  color: '#C62828',
  cursor: 'pointer',
  borderRadius: 6
};

const backBtnStyle = {
  marginBottom: 12,
  padding: '6px 10px',
  borderRadius: 6,
  cursor: 'pointer'
};