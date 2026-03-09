import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: 'localhost',
      base: '/TaskFlow',
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:2500',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
