import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import driverService from '../../services/driverService';
import Driver from '../../models/driver';
import { useNavigate } from 'react-router-dom';



const driverModel: Omit<Driver, 'id' | 'createdAt'> = {
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
  const navigate = useNavigate();

  const handleSubmit = async (values: Omit<Driver, 'id' | 'createdAt'>) => {
    // Replace with your API call
    try {
      await driverService.createDriver(values);
      navigate('/driver');
    } catch (error) {
      alert('Failed to create driver.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={driverModel}
        validationSchema={driverFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Driver"
        statusOptions={['available', 'busy', 'offline']}
        formTitle="Create Driver"
      />
    </div>
  );
};

export default CreateDriverPage;
