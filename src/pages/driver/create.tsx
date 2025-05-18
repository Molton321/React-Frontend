import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';

const driverModel = {
  name: '',
  license_number: '',
  phone: '',
  email: '',
  status: 'available',
};

const driverFormSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  license_number: Yup.string().required('El número de licencia es obligatorio'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
    .required('El teléfono es obligatorio'),
  email: Yup.string().email('Email inválido'),
  status: Yup.string()
    .oneOf(['available', 'busy', 'offline'], 'Estado inválido')
    .required('El estado es obligatorio'),
});

const CreateDriverPage: React.FC = () => {
  const handleSubmit = async (values: Record<string, any>) => {
    // Replace with your API call
    try {
      // await api.post("/drivers", values);
      alert('Driver created successfully!');
    } catch (error) {
      alert('Failed to create driver.');
    }
  };

  return (
    <div>
      <h1>Create Driver</h1>
      <UniversalForm
        model={driverModel}
        validationSchema={driverFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Driver"
      />
    </div>
  );
};

export default CreateDriverPage;
