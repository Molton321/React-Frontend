import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  server: {
    port: 5173, // 💡 Cambia este valor al que desees
    strictPort: true, // ❗ Esto evita que use otro puerto si el 5173 está ocupado
    host: true        // (opcional) útil para acceder desde otros dispositivos
  },
>>>>>>> notificationSound
})
