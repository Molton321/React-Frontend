import { TextCursor } from 'lucide-react';
import React from 'react';

interface GoogleButtonProps {
  onClick: () => void;
  width?: string; // Nueva prop para definir el ancho del botón
  text: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  width = 'auto',
  text,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        backgroundColor: 'transparent', // Fondo transparente
        color: '#31CA58', // Texto verde
        border: '2px solid #31CA58', // Borde verde
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: width, // Aplicar el ancho definido por la prop
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          backgroundColor: 'transparent', // Fondo transparente para el logo
          borderRadius: '50%',
          marginRight: '10px',
        }}
      >
        <img
          src="/src/images/others/google.svg"
          alt="Google Logo"
          style={{ width: '20px', height: '20px' }}
        />
      </div>
      {text}
    </button>
  );
};

export default GoogleButton;
