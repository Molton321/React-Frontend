import React, { useState, useEffect } from 'react';
import FlipableSignCard from '../../components/Auth/Card/FlipableSignCard';

const SignIn: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In triggered');
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign-Up triggered');
  };

  return isDesktop ? (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className="flex w-full h-full md:w-1/2 items-center justify-center sm:bg-white"
        style={{
          background: 'linear-gradient(to right, #31CA58, #19612C)',
        }}
      >
        <FlipableSignCard
          handleGoogleSignIn={handleGoogleSignIn}
          handleGoogleSignUp={handleGoogleSignUp}
        ></FlipableSignCard>
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
        <FlipableSignCard
          handleGoogleSignIn={handleGoogleSignIn}
          handleGoogleSignUp={handleGoogleSignUp}
        ></FlipableSignCard>
      </div>
    </div>
  );
};

export default SignIn;
