import { IoClose } from 'react-icons/io5';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-lg font-bold text-[#353343] dark:text-white">
          Tu carrito de compras
        </h2>
      </div>

      {/* Contenido alineado arriba */}
      <div className="p-4 mt-6">
        <div className="text-center">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Aún no tienes productos en tu canasta
          </p>
        </div>

        <button className="mt-6 w-full bg-[#29D884] hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition">
          Comenzar a comprar
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
