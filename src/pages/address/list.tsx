import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import addressService from '../../services/addressService';

const headers = [
  'id',
  'order_id',
  'street',
  'city',
  'state',
  'postal_code',
  'aditional_info',
];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const AddressListPage: React.FC = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    addressService.getAddresses().then((data) => {
      setAddresses(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre dirección #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Direcciones</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={addresses}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default AddressListPage;
