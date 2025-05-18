import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import orderService from '../../services/orderService';

const headers = [
  'id',
  'customer',
  'address',
  'menu',
  'quantity',
  'total_price',
  'status',
];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    // Implement your action logic here
    alert(`Acción: ${accion} sobre pedido #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Órdenes</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={orders}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default OrderListPage;
