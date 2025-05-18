import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import menuService from '../../services/menuService';

const headers = ['id', 'restaurant', 'product', 'price', 'availability'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const MenuListPage: React.FC = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getMenus().then((data) => {
      setMenus(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre menú #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menús</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={menus}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default MenuListPage;
