import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputSelector from './InputSelector';

interface DynamicFormProps {
  model: { [key: string]: any };
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: any) => void;
  submitLabel?: string;
  readOnly?: boolean; // <-- add this
}

const statusOptions = ['available', 'busy', 'offline'];

const DynamicForm: React.FC<DynamicFormProps> = ({
  model,
  validationSchema,
  onSubmit,
  submitLabel = 'Enviar',
  readOnly = false, // <-- default to false
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
          className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md"
        >
          {Object.keys(model).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-lg font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <InputSelector
                name={key}
                value={values[key]}
                options={key === 'status' ? statusOptions : undefined}
                type={
                  typeof model[key] === 'boolean'
                    ? 'checkbox'
                    : typeof model[key] === 'number'
                    ? 'number'
                    : 'text'
                }
                className="w-full border rounded-md p-2"
                disabled={!!readOnly} // <-- pass disabled
              />
              <ErrorMessage
                name={key}
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          ))}
          {!readOnly && (
            <button
              type="submit"
              className="py-2 px-4 text-white bg-danger rounded-md hover:bg-danger"
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
