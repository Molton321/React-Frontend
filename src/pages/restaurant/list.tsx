import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import restaurantService from '../../services/restaurantService';

const headers = ['id', 'name', 'description', 'address', 'phone', 'email'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const RestaurantListPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantService.getRestaurants().then((data) => {
      setRestaurants(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre restaurante #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Restaurantes</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={restaurants}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default RestaurantListPage;
