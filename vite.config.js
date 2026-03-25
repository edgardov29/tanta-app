import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/tanta-app/', // 👈 nombre exacto del repo en GitHub
});