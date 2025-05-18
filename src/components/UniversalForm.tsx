import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputSelector from './InputSelector';

interface DynamicFormProps {
  model: { [key: string]: any };
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  submitLabel?: string;
  readOnly?: boolean;
  issuesOptions?: string[]; // <-- add this
  statusOptions?: string[]; // <-- add this
}


const DynamicForm: React.FC<DynamicFormProps> = ({
  model,
  validationSchema,
  onSubmit,
  submitLabel = 'Enviar',
  readOnly = false,
  statusOptions,
  issuesOptions // <-- default to false
}) => {
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
          {Object.keys(model)
            .filter((key) => {
              if (!readOnly && (key === 'id' || key === 'created_at' || key === 'motorcycle' || key === 'restaurant' || key === 'product' || key == 'customer' || key === 'menu' || key === 'address' || key === 'driver' || key === 'createdAt')) return false;
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
            <button
              type="submit"
              className="py-2 px-4 text-white bg-danger rounded-md hover:bg-danger dark:bg-primary dark:hover:bg-primary/80"
            >
              {submitLabel}
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
