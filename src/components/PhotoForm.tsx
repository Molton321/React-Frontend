import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Photo from '../models/photo';
import ReferenceSelect from './ReferenceSelect';

interface PhotoFormProps {
  initialValues?: Partial<Omit<Photo, 'id' | 'createdAt'>>;
    onSubmit: (values: any) => void;
  isUpdate?: boolean;
  showFileInput?: boolean;
}

const photoFormSchema = Yup.object({
  issue_id: Yup.number().typeError('Debe ser un número').required('El ID del issue es obligatorio'),
  image_url: Yup.string().when('file', {
    is: (file: any) => !file,
    then: schema => schema.required('La URL de la imagen es obligatoria'),
    otherwise: schema => schema,
  }),
  caption: Yup.string(),
  takenAt: Yup.date().typeError('Debe ser una fecha'),
});

const PhotoForm: React.FC<PhotoFormProps> = ({
  initialValues = {
    issue_id: 0,
    image_url: '',
    caption: '',
    takenAt: '',
  },
  onSubmit,
  isUpdate = false,
  showFileInput = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Formik
      initialValues={{ ...initialValues, file: undefined }}
      validationSchema={photoFormSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (showFileInput && values.file) {
            const formData = new FormData();
            formData.append('issue_id', String(values.issue_id));
            formData.append('caption', values.caption || '');
            formData.append('takenAt', values.takenAt ? new Date(values.takenAt).toISOString() : '');
            formData.append('file', values.file);
            await onSubmit(formData);
          } else {
            const payload = {
              issue_id: values.issue_id,
              image_url: values.image_url,
              caption: values.caption,
              takenAt: values.takenAt,
            };
            await onSubmit(payload);
          }
          resetForm();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="grid grid-cols-1 gap-4 p-6 bg-white dark:bg-boxdark rounded-md shadow-md dark:shadow-none">
          <div>
            <label htmlFor="issue_id" className="block text-lg font-medium text-gray-700 dark:text-white">ID / Issue</label>
            <ReferenceSelect
              name="issue_id"
              model="issue"
              labelKey="description"
              valueKey="id"
              className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
              disabled={!!isUpdate}
            />
            <ErrorMessage name="issue_id" component="p" className="text-red-500 text-sm dark:text-red-400" />
          </div>
          {showFileInput && (
            <div>
              <label htmlFor="file" className="block text-lg font-medium text-gray-700 dark:text-white">Imagen</label>
              <input
                ref={fileInputRef}
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
                onChange={e => {
                  setFieldValue('file', e.currentTarget.files ? e.currentTarget.files[0] : undefined);
                }}
              />
              <ErrorMessage name="file" component="p" className="text-red-500 text-sm dark:text-red-400" />
            </div>
          )}
          {!showFileInput && (
            <div>
              <label htmlFor="image_url" className="block text-lg font-medium text-gray-700 dark:text-white">URL de la imagen</label>
              <Field type="text" name="image_url" className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white" />
              <ErrorMessage name="image_url" component="p" className="text-red-500 text-sm dark:text-red-400" />
            </div>
          )}
          <div>
            <label htmlFor="caption" className="block text-lg font-medium text-gray-700 dark:text-white">Caption</label>
            <Field type="text" name="caption" className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white" />
            <ErrorMessage name="caption" component="p" className="text-red-500 text-sm dark:text-red-400" />
          </div>
          <div>
            <label htmlFor="takenAt" className="block text-lg font-medium text-gray-700 dark:text-white">Fecha de la foto</label>
            <Field type="date" name="takenAt" className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white" />
            <ErrorMessage name="takenAt" component="p" className="text-red-500 text-sm dark:text-red-400" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 text-white bg-danger rounded-md hover:bg-danger dark:bg-primary dark:hover:bg-primary/80"
          >
            {isUpdate ? 'Actualizar Foto' : 'Crear Foto'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PhotoForm;
