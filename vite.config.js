import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './'), // Set the root to the current directory
  build: {
    outDir: 'dist', // Output to the 'dist' folder
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html') // Specify the entry HTML file
      }
    }
  },
  server: {
    open: true // Open the browser automatically on `npm start`
  }
});