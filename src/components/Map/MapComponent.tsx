import { lazy, Suspense } from "react";

const SocketMap = lazy(() => import("../../services/sockets/deliverySocket"));

const MapaComponent = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto rounded-xl shadow-2xl bg-white dark:bg-boxdark border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-300 dark:border-slate-600 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#353343] dark:text-white">
            ¡Monitorea tu pedido en todo momento!
          </h1>
        </div>

        <div className="h-[80vh]">
          <Suspense
            fallback={
              <div className="flex h-full justify-center items-center text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                🔄 Cargando mapa en tiempo real...
              </div>
            }
          >
            <SocketMap />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MapaComponent;
