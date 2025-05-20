import { lazy, Suspense } from "react";

const SocketMap = lazy(() => import("../../components/Map/MapComponent"));

const MapPage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🗺️ Mapa (2/3 de ancho en pantallas grandes) */}
        <div className="lg:col-span-2">

            {/* ❗️IMPORTANTE: No limites aquí el height con overflow-hidden */}
            <Suspense fallback={<div>🔄 Cargando mapa...</div>}>
              <div className="h-[75vh] w-full">
                <SocketMap />
              </div>
            </Suspense>
          </div>

        {/* 📦 Info de Pedido */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark">
            <h3 className="text-lg font-semibold text-[#353343] dark:text-white">
              Seguimiento del Pedido 🚚
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visualiza la ubicación y estado de tu pedido en tiempo real.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark">
            <h4 className="font-semibold text-[#353343] dark:text-white">
              Estado
            </h4>
            <p className="mt-1 text-green-600 font-medium dark:text-white">🟢 En camino</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark">
            <h4 className="font-semibold text-[#353343] dark:text-white">
              Conductor
            </h4>
            <p className="mt-1 text-[#353343] dark:text-white">
              Carlos Ramírez
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark">
            <h4 className="font-semibold text-[#353343] dark:text-white">
              Tiempo estimado
            </h4>
            <p className="mt-1 text-[#353343] dark:text-white">
              12 minutos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
