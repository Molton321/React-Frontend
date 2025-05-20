import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import photoService from '../../services/photoService';
import ReferenceSelect from '../../components/ReferenceSelect';
import { Formik, Form, Field } from 'formik';

const UpdatePhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);
  const image_url = `${import.meta.env.VITE_API_URL}/photos/image/${id}`;


  useEffect(() => {
    
    if (id) {
      photoService.getPhotoById(Number(id)).then((data) => {
        console.log('photoService.getPhotoById response:', data);
        if (data) {
          setInitialValues({
            issue_id: data.issue_id,
            image_url: data.image_url,
            caption: data.caption || '',
            takenAt: data.takenAt ? new Date(data.takenAt).toISOString().slice(0, 10) : '',
          });
        }
      });
    }
  }, [id]);

  const handleUpload = async (values: any, setFieldValue: (field: string, value: any) => void) => {
    if (!values.file) {
      alert('Selecciona un archivo primero');
      return;
    }
    const url = await photoService.uploadImage({
      file: values.file,
      issue_id: values.issue_id,
      caption: values.caption,
      takenAt: values.takenAt,
    });
    if (url) {
      setFieldValue('image_url', url);
      alert('Imagen subida correctamente: ' + url);
    } else {
      alert('Error al subir la imagen');
    }
  };

  const handleSubmit = async (values: any) => {
    await photoService.updatePhoto(Number(id), {
      issue_id: Number(values.issue_id),
      image_url: values.image_url,
      caption: values.caption,
      takenAt: values.takenAt ? new Date(values.takenAt) : undefined,
    });
    alert('Foto actualizada');
    navigate('/photo');
  };

  if (!initialValues) return <div className="p-6">Cargando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold">Edit Photo {id}</h1>
        <button
          type="button"
          className="flex items-center gap-2 w-fit text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
          onClick={() => navigate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
      </div>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-4 p-6 bg-white dark:bg-boxdark rounded-md shadow-md dark:shadow-none max-w-lg mx-auto">
            <label className="block">
              <span className="block text-lg font-medium text-gray-700 dark:text-white">Issue:</span>
              <ReferenceSelect
                name="issue_id"
                model="issue"
                labelKey="description"
                valueKey="id"
                className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
                disabled={false}
              />
            </label>
            <label className="block">
              <span className="block text-lg font-medium text-gray-700 dark:text-white">Image URL</span>
              <Field
                type="text"
                name="image_url"
                disabled
                value={values.file ? values.file.name.replace(/\s+/g, '-') : values.image_url}
                className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white cursor-not-allowed"
              />
            </label>
            <label className="block">
              <span className="block text-lg font-medium text-gray-700 dark:text-white">Caption:</span>
              <Field
                type="text"
                name="caption"
                className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
              />
            </label>
            <label className="block">
              <span className="block text-lg font-medium text-gray-700 dark:text-white">Taken At:</span>
              <Field
                type="date"
                name="takenAt"
                className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
              />
            </label>
            <label className="block">
              <span className="block text-lg font-medium text-gray-700 dark:text-white">File:</span>
              <div className="flex flex-col gap-2">
                {/* Previsualización */}
                {values.file ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={URL.createObjectURL(values.file)}
                      alt="preview"
                      className="max-h-48 rounded shadow border border-gray-200 dark:border-form-strokedark object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue('file', undefined);
                        setFieldValue('image_url', '');
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Quitar imagen
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <img src={image_url} alt={'Foto'} style={{ maxWidth: 400, borderRadius: 8 }} />
                  </div>
                )}
              </div>
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 text-white bg-primary rounded-md hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
                disabled={isSubmitting}
              >
                Update Photo
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePhotoPage;