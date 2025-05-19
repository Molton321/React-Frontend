import React, { useEffect, useState } from 'react';
import Photo from '../../models/photo';
import photoService from '../../services/photoService';
import { useParams } from 'react-router-dom';

const ViewPhotoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        if (id) {
            photoService.getPhotoById(Number(id)).then(data => {
                setPhoto(data);
            });
        }
    }, [id]);

    if (!photo) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Ver Foto {id}</h1>
            <div className="bg-white dark:bg-boxdark rounded-md shadow-md p-6 flex flex-col gap-4">
                <div>
                    <strong>ID Issue:</strong> {photo.issue_id}
                </div>
                <div>
                    <strong>Caption:</strong> {photo.caption || 'Sin descripción'}
                </div>
                <div>
                    <strong>Fecha tomada:</strong> {photo.takenAt ? new Date(photo.takenAt).toLocaleDateString() : 'No especificada'}
                </div>
                <div>
                    <strong>Imagen:</strong><br />
                    <img src={photo.image_url} alt={photo.caption || 'Foto'} style={{ maxWidth: 400, borderRadius: 8 }} />
                </div>
            </div>
        </div>
    );
};

export default ViewPhotoPage;
