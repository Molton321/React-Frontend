import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Photo from '../../models/photo';
import photoService from '../../services/photoService';


const photoModel: Omit<Photo, 'id' | 'createdAt'> = {
  issue_id: 0,
  image_url: '',
  caption: '',
  takenAt: new Date(),
};

const photoFormSchema = Yup.object({
  issue_id: Yup.number().typeError('Debe ser un número').required('El ID del issue es obligatorio'),
  image_url: Yup.string().required('La URL de la imagen es obligatoria'),
  caption: Yup.string(),
  takenAt: Yup.date().typeError('Debe ser una fecha'),
});

const CreatePhotoPage: React.FC = () => {
  const handleSubmit = async (values: typeof photoModel) => {
    try {
      // Construir FormData para subida de foto
      const formData = new FormData();
      formData.append('issue_id', String(values.issue_id));
      formData.append('image_url', values.image_url);
      if (values.caption) formData.append('caption', values.caption);
      if (values.takenAt) formData.append('takenAt', new Date(values.takenAt).toISOString());
      await photoService.uploadPhoto(Number(values.issue_id), formData);
      alert('Photo created successfully!');
    } catch (error) {
      alert('Failed to create photo.');
    }
  };

  return (
    <div>
      <h1>Create Photo</h1>
      <UniversalForm
        model={photoModel}
        validationSchema={photoFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Photo"
      />
    </div>
  );
};

export default CreatePhotoPage;
