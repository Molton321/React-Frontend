import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  route: string | number; // Accepts a custom route or -1 for go back
  children?: React.ReactNode;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  route,
  children = 'Back',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route === -1) {
      navigate(-1);
    } else if (typeof route === 'string') {
      navigate(route);
    }
  };

  return (
    <button
      type="button"
      className={`flex items-center gap-2 w-fit text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium ${className}`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      {children}
    </button>
  );
};

export default BackButton;
