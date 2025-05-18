import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import shiftService from '../../services/shiftService';

const headers = [
  'id',
  'driver',
  'motorcycle',
  'start_time',
  'end_time',
  'status',
];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const ShiftListPage: React.FC = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shiftService.getShifts().then((data) => {
      setShifts(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre turno #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Turnos</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={shifts}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default ShiftListPage;
