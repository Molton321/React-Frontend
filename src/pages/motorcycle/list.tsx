import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import motorcycleService from '../../services/motorcycleService';

const headers = ['id', 'license_plate', 'brand', 'year', 'status'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const MotorcycleListPage: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    motorcycleService.getMotorcycles().then((data) => {
      setMotorcycles(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre motocicleta #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Motocicletas</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={motorcycles}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default MotorcycleListPage;
