import React, { useEffect, useState } from 'react';
import Photo from '../../models/photo';
import photoService from '../../services/photoService';
import { useParams } from 'react-router-dom';

const ViewPhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);

  // Utilidad para obtener la URL absoluta de la imagen
  const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    const baseUrl = import.meta.env.VITE_API_URL || '';
    return baseUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
  };

  useEffect(() => {
    if (id) {
      photoService.getPhotoById(Number(id)).then(data => {
        setPhoto(data);
      });
    }
  }, [id]);

  if (!photo) return <div className="p-6">Cargando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold">View Photo {id}</h1>
        <button
          type="button"
          className="flex items-center gap-2 w-fit text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6 bg-white dark:bg-boxdark rounded-md shadow-md dark:shadow-none max-w-lg mx-auto">
        <label className="block">
          <span className="block text-lg font-medium text-gray-700 dark:text-white">Issue:</span>
          <input
            type="text"
            value={photo.issue_id}
            disabled
            className="w-full border rounded-md p-2 bg-gray-100 dark:bg-form-input dark:border-form-strokedark dark:text-white cursor-not-allowed"
          />
        </label>
        <label className="block">
          <span className="block text-lg font-medium text-gray-700 dark:text-white">Image URL</span>
          <input
            type="text"
            value={photo.image_url}
            disabled
            className="w-full border rounded-md p-2 bg-gray-100 dark:bg-form-input dark:border-form-strokedark dark:text-white cursor-not-allowed"
          />
        </label>
        <label className="block">
          <span className="block text-lg font-medium text-gray-700 dark:text-white">Caption:</span>
          <input
            type="text"
            value={photo.caption || ''}
            disabled
            className="w-full border rounded-md p-2 bg-gray-100 dark:bg-form-input dark:border-form-strokedark dark:text-white cursor-not-allowed"
          />
        </label>
        <label className="block">
          <span className="block text-lg font-medium text-gray-700 dark:text-white">Taken At:</span>
          <input
            type="date"
            value={photo.takenAt ? new Date(photo.takenAt).toISOString().slice(0, 10) : ''}
            disabled
            className="w-full border rounded-md p-2 bg-gray-100 dark:bg-form-input dark:border-form-strokedark dark:text-white cursor-not-allowed"
          />
        </label>
        <label className="block">
          <span className="block text-lg font-medium text-gray-700 dark:text-white">File:</span>
          <div className="flex flex-col gap-2 items-center">
            {photo.image_url ? (
              <img
                src={getImageUrl(photo.image_url)}
                alt={photo.caption || 'Foto'}
                className="max-h-48 rounded shadow border border-gray-200 dark:border-form-strokedark object-contain"
              />
            ) : (
              <span>No hay imagen disponible</span>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};

export default ViewPhotoPage;
