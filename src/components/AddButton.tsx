import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AddButtonProps {
  label: string;
  to: string;
}

const AddButton: React.FC<AddButtonProps> = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow transition-colors duration-150
        bg-primary hover:bg-blue-700 active:bg-blue-800 text-white
        dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 "
      onClick={() => navigate(to)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      {label}
    </button>
  );
};

export default AddButton;
