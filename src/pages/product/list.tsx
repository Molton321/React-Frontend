import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import productService from '../../services/productService';

const headers = ['id', 'name', 'description', 'price', 'category'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre producto #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={products}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default ProductListPage;
