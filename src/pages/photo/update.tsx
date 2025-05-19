import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import photoService from '../../services/photoService';
import ReferenceSelect from '../../components/ReferenceSelect';
import { Formik, Form, Field } from 'formik';
import Photo from '../../models/photo';

const UpdatePhotoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (id) {
      photoService.getPhotoById(Number(id)).then((data) => {
        if (data) {
          setInitialValues({
            issue_id: data.issue_id,
            image_url: data.image_url,
            caption: data.caption || '',
            takenAt: data.takenAt ? new Date(data.takenAt).toISOString().slice(0, 10) : '',
            file: undefined,
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
    navigate('/photo/list');
  };

  if (!initialValues) return <div className="p-6">Cargando...</div>;

  return (
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
            <span className="block text-lg font-medium text-gray-700 dark:text-white">URL de la imagen:</span>
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
            <span className="block text-lg font-medium text-gray-700 dark:text-white">Fecha de la foto:</span>
            <Field
              type="date"
              name="takenAt"
              className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
            />
          </label>
          <label className="block">
            <span className="block text-lg font-medium text-gray-700 dark:text-white">Archivo:</span>
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
                <>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        const file = e.currentTarget.files[0];
                        setFieldValue('file', file);
                        setFieldValue('image_url', file.name.replace(/\s+/g, '-'));
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="file-upload">
                    <span className="inline-block px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary/80 transition-colors">
                      Seleccionar imagen
                    </span>
                  </label>
                </>
              )}
            </div>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (values.file) {
                  handleUpload(values, setFieldValue);
                } else {
                  alert('Selecciona un archivo primero');
                }
              }}
              className="py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={isSubmitting}
            >
              Subir Imagen
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-white bg-green-500 rounded-md hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
              disabled={isSubmitting}
            >
              Actualizar Foto
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePhotoPage;