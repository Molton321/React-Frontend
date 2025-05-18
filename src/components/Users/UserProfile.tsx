import React from "react";
import { User } from "../../models/User";

interface UserProfileProps {
  users: User[];
}

const UserProfile: React.FC<UserProfileProps> = ({ users }) => {
  console.log(users);
  
  return (
    <div className="user-profile">
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
