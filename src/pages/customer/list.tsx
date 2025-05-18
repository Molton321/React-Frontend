import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import customerService from '../../services/customerService';

const headers = ['id', 'name', 'email', 'phone'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerService.getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre cliente #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={customers}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default CustomerListPage;
