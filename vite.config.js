import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: true,
    port: 5174,
    allowedHosts: ['gateway-1-kutj.onrender.com', 'gateway-hiht.onrender.com', '9020-2401-4900-62f6-b6a4-6973-7555-970c-d3f7.ngrok-free.app', 'localhost:8080', 'localhost:5174'], // ⬅ Add your host here
  },
})
