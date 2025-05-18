import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import driverService from '../../services/driverService';

const headers = ['id', 'name', 'license_number', 'phone', 'email', 'status'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const DriverListPage: React.FC = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    driverService.getDrivers().then((data) => {
      setDrivers(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre conductor #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Conductores</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={drivers}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default DriverListPage;
