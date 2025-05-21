import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

export function useNotificationSocket(onNotify: (data: any) => void) {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Conectado al socket');
    });

    socket.on('notificacion', (data) => {
      console.log('🔔 Notificación recibida:', data);
      onNotify(data);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Desconectado del socket');
    });

    return () => {
      socket.off('notificacion');
    };
  }, [onNotify]);
}
