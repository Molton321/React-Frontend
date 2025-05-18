import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import photoService from '../../services/photoService';

const headers = ['id', 'issue', 'image_url', 'caption', 'takenAt'];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const PhotoListPage: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    photoService.getPhotos().then((data) => {
      setPhotos(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre foto #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fotos</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={photos}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default PhotoListPage;
