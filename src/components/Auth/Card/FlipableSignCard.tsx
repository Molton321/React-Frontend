import React from 'react';
import './flip.css'; // Optional: Add styles if needed
import GoogleButton from '../../GoogleButton';
import GreenButton from '../../GreenButton';

interface FlipableSignCardProps {
  handleGoogleSignUp: () => void;
  handleGoogleSignIn: () => void;
}

const FlipableSignCard: React.FC<FlipableSignCardProps> = ({
  handleGoogleSignUp,
  handleGoogleSignIn,
}) => {
  const flip = () => {
    const flipper = document.querySelector('.flipper');
    if (flipper) {
      flipper.classList.toggle('flip');
    }
  };

  return (
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          <div className="flex flex-col items-center justify-center space-y-10">
            <div
              className="w-4/5 max-w-lg p-10 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700"
              id="card"
            >
              <form className="space-y-10" action="#">
                <h5 className="mt-5 text-xl md:text-3xl font-medium text-gray-900 dark:text-white text-center">
                  Regístrate para <span className="emphasis">continuar</span>
                </h5>
                <div className="flex flex-col items-center space-y-4">
                  <GoogleButton
                    onClick={handleGoogleSignUp}
                    text="Registrate Ya"
                  ></GoogleButton>
                  <GreenButton
                    onClick={flip}
                    text={'Ya tengo una cuenta'}
                  ></GreenButton>
                </div>
                <div className="flex items-start">
                  <label className="ms-2 text-xs md:text-lg text-center font-medium text-gray-900 dark:text-gray-300 mb-10">
                    Al registrarte con nosotros aceptas los{' '}
                    <span className="emphasis">Términos del Servicio</span> y
                    las{' '}
                    <span className="emphasis">Políticas de Privacidad</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="flex flex-col items-center justify-center space-y-10">
            <div
              className="w-4/5 max-w-lg p-10 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700"
              id="card"
            >
              <form className="space-y-10" action="#">
                <h5 className="mt-5 text-xl md:text-3xl font-medium text-gray-900 dark:text-white text-center">
                  Inicia sesión para <span className="emphasis">continuar</span>
                </h5>
                <div className="flex flex-col items-center space-y-4">
                  <GoogleButton
                    onClick={handleGoogleSignIn}
                    text="Inicia sesión"
                  ></GoogleButton>
                  <GreenButton
                    onClick={flip}
                    text={'No tengo cuenta'}
                  ></GreenButton>
                </div>
                <div className="flex items-start">
                  <label className="ms-2 text-xs md:text-lg text-center font-medium text-gray-900 dark:text-gray-300 mb-10">
                    Al registrarte con nosotros aceptas los{' '}
                    <span className="emphasis">Términos del Servicio</span> y
                    las{' '}
                    <span className="emphasis">Políticas de Privacidad</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipableSignCard;
