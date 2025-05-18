import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { io } from 'socket.io-client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🔧 Icono Leaflet (sin esto no aparece el marcador)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const PLATE = 'ABC124';
const socket = io('http://localhost:5000');

// 📍 Componente auxiliar para centrar el mapa
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

const SocketMap = () => {
  const [position, setPosition] = useState<[number, number]>([5.071, -75.5144]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');

    // 🟢 Iniciar tracking en backend
    fetch(`http://localhost:5000/motorcycles/track/${PLATE}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => console.log('🟢 Tracking iniciado:', data))
      .catch((err) => console.error('❌ Error al iniciar tracking:', err));

    // 📡 Escuchar coordenadas nuevas
    socket.on('actualizar_mapa', (data: { lat: number; lng: number }) => {
      if (typeof data.lat === 'number' && typeof data.lng === 'number') {
        const newPos: [number, number] = [data.lat, data.lng];
        console.log('📍 Nueva posición:', newPos); // <- Para verificar
        setPosition(newPos);
      }
    });

    return () => {
      fetch(`http://localhost:5000/motorcycles/stop/${PLATE}`, {
        method: 'POST',
      });
      socket.off('actualizar_mapa');
    };
  }, []);

  // ⚠️ Evitar renderizado si no es cliente
  if (!isClient) return null;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: '80vh', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeMapView center={position} />
      <Marker key={position.join(',')} position={position}>
        <Popup>📍 Posición en tiempo real</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SocketMap;
