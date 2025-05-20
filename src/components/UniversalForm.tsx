import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputSelector from './InputSelector';
import { useNavigate } from 'react-router-dom';

interface DynamicFormProps {
  model: { [key: string]: any };
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  submitLabel?: string;
  readOnly?: boolean;
  issuesOptions?: string[];
  statusOptions?: string[];
  hideItems?: boolean;
  formTitle?: string; // <-- nueva prop
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  model,
  validationSchema,
  onSubmit,
  submitLabel = 'Enviar',
  readOnly = false,
  statusOptions,
  issuesOptions,
  hideItems = true,
  formTitle = '', // <-- default vacío
}) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={model}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }) => (
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 p-6 bg-white dark:bg-boxdark rounded-md shadow-md dark:shadow-none"
        >
          {/* Encabezado con título y botón de retroceso */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-black dark:text-white text-xl">{formTitle}</h3>
            <button
              type="button"
              className="flex items-center gap-2 w-fit mb-2 text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium"
              onClick={() => navigate(-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          </div>
          {Object.keys(model)
            .filter((key) => {
              if (hideItems && (key === 'id' || key === 'created_at' || key === 'motorcycle' || key === 'restaurant' || key === 'product' || key == 'customer' || key === 'menu' || key === 'address' || key === 'driver' || key === 'createdAt')) return false;
              return true;
            })
            .map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-lg font-medium text-gray-700 dark:text-white"
                >
                  {key.endsWith('_id')
                    ? (<>
                      <span className="font-semibold text-primary dark:text-primary">ID</span>
                      <span className="mx-1">/</span>
                      {key.replace(/_id$/, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </>)
                    : key.charAt(0).toUpperCase() + key.slice(1)
                  }
                </label>
                <InputSelector
                  name={key}
                  value={values[key]}
                  options={key === 'status' ? statusOptions : key === 'issue_type' ? issuesOptions : undefined}
                  type={
                    typeof model[key] === 'boolean'
                      ? 'checkbox'
                      : typeof model[key] === 'number'
                        ? 'number'
                        : 'text'
                  }
                  className="w-full border rounded-md p-2 bg-white dark:bg-form-input dark:border-form-strokedark dark:text-white"
                  disabled={!!readOnly} // <-- pass disabled
                />
                <ErrorMessage
                  name={key}
                  component="p"
                  className="text-red-500 text-sm dark:text-red-400"
                />
              </div>
            ))}
          {!readOnly && (
            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 text-white bg-primary rounded-md hover:bg-blue-700 dark:bg-primary dark:hover:bg-primary/80"
              >
                {submitLabel}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
