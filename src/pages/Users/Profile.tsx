import React from "react";
import UserProfile from "../../components/Users/UserProfile";
import { User } from "../../models/User";

const Profile: React.FC = () => {
  const users: User[] = [ // Cambié 'user' a 'users' para evitar confusión
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", age: 30 },
    { id: 2, name: "María Gómez", email: "maria.gomez@example.com", age: 25 },
    { id: 3, name: "Carlos Ramírez", email: "carlos.ramirez@example.com", age: 40 },
    { id: 4, name: "Ana Torres", email: "ana.torres@example.com", age: 28 },
    { id: 5, name: "Luis Fernández", email: "luis.fernandez@example.com", age: 35 },
    { id: 6, name: "Elena López", email: "elena.lopez@example.com", age: 32 },
    { id: 7, name: "Javier Díaz", email: "javier.diaz@example.com", age: 29 },
    { id: 8, name: "Sofía Herrera", email: "sofia.herrera@example.com", age: 27 },
    { id: 9, name: "Fernando Castillo", email: "fernando.castillo@example.com", age: 45 },
    { id: 10, name: "Patricia Mendoza", email: "patricia.mendoza@example.com", age: 31 },
    { id: 11, name: "Andrés Silva", email: "andres.silva@example.com", age: 37 },
    { id: 12, name: "Gabriela Ríos", email: "gabriela.rios@example.com", age: 26 },
    { id: 13, name: "Ricardo Ortega", email: "ricardo.ortega@example.com", age: 34 },
    { id: 14, name: "Mónica Vargas", email: "monica.vargas@example.com", age: 30 },
    { id: 15, name: "Hugo Morales", email: "hugo.morales@example.com", age: 33 },
    { id: 16, name: "Natalia Jiménez", email: "natalia.jimenez@example.com", age: 24 },
    { id: 17, name: "Sebastián Castro", email: "sebastian.castro@example.com", age: 42 },
    { id: 18, name: "Laura Peña", email: "laura.pena@example.com", age: 29 },
    { id: 19, name: "Manuel Paredes", email: "manuel.paredes@example.com", age: 38 },
    { id: 20, name: "Camila Suárez", email: "camila.suarez@example.com", age: 23 }
  ];
  
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <UserProfile users={users} />
    </div>
  );
};

export default Profile;
