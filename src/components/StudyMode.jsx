// frontend/src/components/StudyMode.jsx
import React, { useEffect, useState } from 'react';
import { loadAllData, generarPreguntasChecklist } from '../utils/data';
import { recordResult } from '../utils/progress';

export default function StudyMode({ categoria = 'ensaladas' }) {
  const [preguntas, setPreguntas] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function init() {
      const { ensaladas, piqueos, entradas } = await loadAllData();
      const all = [...ensaladas, ...piqueos, ...entradas];
      const lista = categoria === 'ensaladas' ? ensaladas : categoria === 'piqueos' ? piqueos : entradas;
      const preguntasGen = generarPreguntasChecklist(lista);
      setPreguntas(preguntasGen);
    }
    init();
  }, [categoria]);

  if (!preguntas.length) return <div>Cargando preguntas...</div>;
  const q = preguntas[index];

  function toggle(opt) {
    setSelected(s => s.includes(opt) ? s.filter(x => x !== opt) : [...s, opt]);
  }

  function verificar() {
    const correct = q.respuestas_correctas;
    const aciertos = selected.filter(s => correct.includes(s)).length;
    const falsos = selected.filter(s => !correct.includes(s)).length;
    const puntos = Math.max(0, aciertos - falsos);
    setScore(prev => prev + puntos);
    const missing = correct.filter(c => !selected.includes(c));
    recordResult(q.plato_id, aciertos, correct.length, missing);
    if (index + 1 < preguntas.length) {
      setIndex(index + 1);
      setSelected([]);
    } else {
      alert(`Sesión terminada. Puntaje: ${score + puntos}`);
    }
  }

  return (
    <div>
      <h3>{q.plato}</h3>
      <p>{q.instrucciones}</p>
      <div>
        {q.opciones.map(opt => (
          <label key={opt} style={{display:'block', margin:'6px 0'}}>
            <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
            {' '}{opt}
          </label>
        ))}
      </div>
      <button onClick={verificar}>Verificar ingredientes</button>
      <p>Puntaje actual: {score}</p>
    </div>
  );
}