import React from 'react';
import './flip.css'; // Optional: Add styles if needed
import GoogleButton from '../../GoogleButton';
import GreenButton from '../../GreenButton';

const FlipableSignCard: React.FC = () => {
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
          <div className=" p-2 sm:p-20 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-20" action="#">
              <h5 className="mt-10 text-2xl md:text-4xl font-medium text-gray-900 dark:text-white text-center">
                Regístrate para <span className="emphasis">continuar</span>
              </h5>
              <div className="flex flex-col items-center space-y-2">
                <GoogleButton
                  onClick={() => {
                    console.log('Google');
                  }}
                  text="Resgístrate ya"
                ></GoogleButton>
                <GreenButton
                  onClick={flip}
                  text={'Ya tengo una cuenta'}
                ></GreenButton>
              </div>
              <div className="flex items-start">
                <label className="ms-2 text-sm md:text-xl text-center font-medium text-gray-900 dark:text-gray-300 mb-20">
                  Al registrarte con nosotros aceptas los{' '}
                  <span className="emphasis">Términos del Servicio</span> y las{' '}
                  <span className="emphasis">Políticas de Privacidad</span>
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="back">
          <div className=" max-w-lg p-2 sm:p-20 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-20" action="#">
              <h5 className="mt-10 text-2xl md:text-4xl font-medium text-gray-900 dark:text-white text-center">
                Inicia sesión para <span className="emphasis">continuar</span>
              </h5>
              <div className="flex flex-col items-center space-y-2">
                <GoogleButton
                  onClick={() => {
                    console.log('Google');
                  }}
                  text="Inicia sesión"
                ></GoogleButton>
                <GreenButton
                  onClick={flip}
                  text={'No tengo una cuenta'}
                ></GreenButton>
              </div>
              <div className="flex items-start">
                <label className="ms-2 text-sm md:text-xl text-center font-medium text-gray-900 dark:text-gray-300 mb-20">
                  Al registrarte con nosotros aceptas los{' '}
                  <span className="emphasis">Términos del Servicio</span> y las{' '}
                  <span className="emphasis">Políticas de Privacidad</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipableSignCard;
