// frontend/src/utils/data.js
export async function loadAllData() {
  const [ensaladas, piqueos, entradas, meta] = await Promise.all([
    fetch('/data/ensaladas.json').then(r=>r.json()),
    fetch('/data/piqueos.json').then(r=>r.json()),
    fetch('/data/entradas.json').then(r=>r.json()),
    fetch('/data/meta.json').then(r=>r.json())
  ]);
  return { ensaladas, piqueos, entradas, meta };
}

export function expandirIngredientes(ingredientes = []) {
  const resultado = [];
  function recorrer(lista) {
    for (const ing of lista || []) {
      if (ing && ing.tipo === 'componente' && Array.isArray(ing.ingredientes)) {
        recorrer(ing.ingredientes);
      } else if (ing && ing.nombre) {
        resultado.push(ing);
      }
    }
  }
  recorrer(ingredientes);
  return resultado;
}

export function generarPreguntasChecklist(platos) {
  // platos: array de objetos (ya cargados)
  const all = platos;
  return platos.map(p => {
    const expand = expandirIngredientes(p.ingredientes || []);
    const correct = Array.from(new Set(expand.map(i => i.nombre)));
    const otros = all
      .filter(x => x.id !== p.id)
      .flatMap(x => expandirIngredientes(x.ingredientes || []).map(i => i.nombre));
    // mezclar y limitar opciones
    const opciones = Array.from(new Set([...correct.slice(0,6), ...otros.slice(0,8)])).slice(0, Math.max(8, correct.length + 4));
    return {
      id: `q_${p.id}`,
      plato_id: p.id,
      plato: p.plato,
      tipo: 'checklist',
      instrucciones: `Marca los ingredientes que lleva este plato — contiene ${correct.length} ingredientes.`,
      opciones,
      respuestas_correctas: correct
    };
  });
}