import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import userService from '../../services/userService';

const headers = ['id', 'name', 'email', 'age', 'city', 'phone', 'is_active'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre usuario #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={users}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default UserListPage;
