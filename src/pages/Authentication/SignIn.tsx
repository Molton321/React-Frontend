import React, { useState, useEffect } from 'react';

const SignIn: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  const handleCredentialResponse = (response: any) => {
    const { credential } = response;
    console.log('Encoded JWT ID token: ' + credential);
    if (credential) {
      const user = JSON.parse(atob(credential.split('.')[1]));
      user.token = credential; // Add token inside user object
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '295456302918-vv5kvp39q82c1joq8m6l04fjqetrpnt9.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme: 'outline',
      size: 'large',
    });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktop ? (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className="flex w-full h-full md:w-1/2 items-center justify-center sm:bg-white"
        style={{ background: 'linear-gradient(to right, #31CA58, #19612C)' }}
      >
        <div
          className=" max-w-lg p-2 sm:p-20 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700"
          id="card"
        >
          <form className="space-y-20" action="#">
            <h5 className="mt-10 text-2xl md:text-4xl font-medium text-gray-900 dark:text-white text-center">
              Regístrate o Inicia sesión para{' '}
              <span className="emphasis">continuar</span>
            </h5>
            <div className="flex flex-col items-center space-y-2">
              <div id="google-button"></div>
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
      <div
        className="hidden md:flex w-1/2 items-center justify-center relative"
        style={{
          backgroundImage: 'url(/src/images/others/food.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <h1
          className="relative text-white text-4xl md:text-6xl font-normal text-left px-1"
          style={{ maxWidth: '400px' }}
        >
          Tu comida favorita está a un clic. ¡Inicia sesión y deja que te la
          llevemos!
        </h1>
      </div>
    </div>
  ) : (
    <div
      className="flex w-full h-screen items-center justify-center relative flex-row"
      style={{
        backgroundImage: 'url(/src/images/others/food.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 1,
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-10">
        <h1
          className="relative text-white text-4xl md:text-6xl font-normal text-center px-3"
          style={{ maxWidth: '400px' }}
        >
          Tu comida favorita está a un clic. ¡Inicia sesión y deja que te la
          llevemos!
        </h1>
        <div
          className="w-4/5 max-w-lg p-4 sm:p-10 bg-white rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700"
          id="card"
        >
          <form className="space-y-10" action="#">
            <h5 className="mt-5 text-xl md:text-3xl font-medium text-gray-900 dark:text-white text-center">
              Regístrate o Inicia sesión para{' '}
              <span className="emphasis">continuar</span>
            </h5>
            <div className="flex flex-col items-center space-y-4">
              <div id="google-button"></div>
            </div>
            <div className="flex items-start">
              <label className="ms-2 text-xs md:text-lg text-center font-medium text-gray-900 dark:text-gray-300 mb-10">
                Al registrarte con nosotros aceptas los{' '}
                <span className="emphasis">Términos del Servicio</span> y las{' '}
                <span className="emphasis">Políticas de Privacidad</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
