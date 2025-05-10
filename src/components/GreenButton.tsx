import React from 'react';

interface GreenButtonProps {
  onClick: () => void;
  text: String;
  width?: string;
}
const GreenButton: React.FC<GreenButtonProps> = ({
  onClick,
  text,
  width = 'auto',
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        backgroundColor: '#31CA58',
        color: 'white',
        border: 'none',
        padding: '15px 20px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#28A745';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#31CA58';
      }}
    >
      {text}
    </button>
  );
};

export default GreenButton;
