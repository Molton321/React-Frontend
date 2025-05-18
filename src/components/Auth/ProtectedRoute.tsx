<<<<<<< HEAD
import { Navigate, Outlet } from 'react-router-dom';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user ? true : true;
=======
import { Navigate, Outlet } from "react-router-dom";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user ? true : false;
>>>>>>> notificationSound
};

// Componente de Ruta Protegida
const ProtectedRoute = () => {
<<<<<<< HEAD
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" replace />
  );
=======
    return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/signin" replace />;
>>>>>>> notificationSound
};

export default ProtectedRoute;
