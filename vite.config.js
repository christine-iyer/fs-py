import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:5000',
      '/create': 'http://localhost:5000',
      '/delete': 'http://localhost:5000',
    },
  },
});
