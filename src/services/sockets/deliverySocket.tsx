import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =====================
// Configuración de iconos de Leaflet
// =====================
// Esto asegura que los íconos de los marcadores se muestren correctamente en React
// y no fallen por rutas relativas.

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// =====================
// Constantes de configuración
// =====================
const PLATE = "ABC124"; // Placa de la moto a rastrear
const url = import.meta.env.VITE_BACKEND_URL; // URL del backend
const socket = io(url); // Conexión a Socket.IO

// =====================
// Componente auxiliar para centrar el mapa
// =====================
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// =====================
// Componente principal: SocketMap
// =====================
/**
 * Muestra un mapa en tiempo real con la ubicación de una moto de reparto.
 * Se conecta al backend por WebSocket y actualiza la posición del marcador.
 */
const SocketMap = () => {
  // Estado para la posición actual del marcador
  const [position, setPosition] = useState<[number, number]>([
    5.071, -75.5144,
  ]);
  // Estado para saber si el código se ejecuta en el cliente
  const [isClient, setIsClient] = useState(false);

  // Suscripción a WebSocket y limpieza al desmontar
  useEffect(() => {
    setIsClient(typeof window !== "undefined");

    // Inicia el tracking en el backend
    fetch(`${url}/motorcycles/track/${PLATE}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log("🟢 Tracking iniciado:", data))
      .catch((err) => console.error("❌ Error al iniciar tracking:", err));

    // Escucha actualizaciones de posición desde el backend
    socket.on("actualizar_mapa", (data: { lat: number; lng: number }) => {
      if (typeof data.lat === "number" && typeof data.lng === "number") {
        setPosition([data.lat, data.lng]);
      }
    });

    // Limpieza al desmontar: elimina el listener y detiene el tracking
    return () => {
      socket.off("actualizar_mapa");
      fetch(`${url}/motorcycles/stop/${PLATE}`, {
        method: "POST",
      });
      console.log("🔴 Tracking detenido");
    };
  }, []);

  // Maneja el cierre o recarga de la pestaña para detener el tracking
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon(
        `${url}/motorcycles/stop/${PLATE}`
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
  // Evita renderizar en SSR
  if (!isClient) return null;

  // Renderiza el mapa con la posición actual
  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeMapView center={position} />
      <Marker key={position.join(",")} position={position}>
        <Popup>📍 ¡Aquí va tu pedido!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SocketMap;
