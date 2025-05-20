import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL); // Asegúrate de que esta URL coincida con tu backend

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    { message: string; date: string }[]
  >([]);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const audio = useRef(new Audio('/sounds/notificationSound.mp3')); // 🔔 asegúrate de que exista esta ruta

  const playNotificationSound = () => {
    audio.current.play().catch((e) => {
      console.warn('🔇 Sonido bloqueado por el navegador:', e);
    });
  };

  // 🔔 Socket listener
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket');
    });

    socket.on('notificacion', (data: { message: string; title: string }) => {
      const nueva = {
        message: `${data.title}: ${data.message}`,
        date: new Date().toLocaleString(),
      };
      setNotifications((prev) => [nueva, ...prev]);
      playNotificationSound();
      setDropdownOpen(true);
    });

    return () => {
      socket.off('notificacion');
    };
  }, []);

  // 🔽 Cierra si se hace clic afuera
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // 🔽 Cierra con Escape
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        🔔
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notificaciones</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications.map((notif, idx) => (
            <li key={idx}>
              <Link
                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to="#"
              >
                <p className="text-sm text-black dark:text-white">
                  {notif.message}
                </p>
                <p className="text-xs">{notif.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
