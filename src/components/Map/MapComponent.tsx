import { lazy, Suspense } from "react";

const SocketMap = lazy(() => import("../../services/sockets/deliverySocket"));

const MapaComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🛵 Mapa en tiempo real</h1>
      <Suspense fallback={<div>🔄 Cargando mapa...</div>}>
        <SocketMap />
      </Suspense>
    </div>
  );
};

export default MapaComponent;
