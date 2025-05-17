import React from 'react';

interface GoogleButtonProps {
  onClick: () => void;
  width?: string; // Nueva prop para definir el ancho del botón
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  width = 'auto',
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
        color: '#FF3333', // Texto rojo
        border: '2px solid #FF3333', // Borde rojo
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
      Regístrate Ya
    </button>
  );
};

export default GoogleButton;
