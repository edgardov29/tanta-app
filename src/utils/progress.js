// frontend/src/utils/progress.js
const PROGRESS_KEY = 'tanta_progress_v1';

export function loadProgress() {
  return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
}

export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function recordResult(platoId, correctCount, totalCorrect, missing = []) {
  const state = loadProgress();
  const entry = state[platoId] || { attempts: 0, mistakes: 0, lastSeen: null, score: 0 };
  entry.attempts += 1;
  entry.mistakes += missing.length;
  entry.lastSeen = Date.now();
  entry.score = Math.round(((entry.score * (entry.attempts - 1)) + (correctCount / Math.max(1, totalCorrect))) / entry.attempts * 100);
  state[platoId] = entry;
  saveProgress(state);
}

export function getPriorityPlatos(allPlatos) {
  const state = loadProgress();
  return allPlatos
    .map(p => ({ ...p, mistakes: (state[p.id] && state[p.id].mistakes) || 0 }))
    .sort((a, b) => b.mistakes - a.mistakes);
}