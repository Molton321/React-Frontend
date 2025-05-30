import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Customer from '../../models/customer';
import customerService from '../../services/customerService';
import { useNavigate } from 'react-router-dom';

const customerModel: Omit<Customer, 'id' | 'createdAt'> = {
  name: '',
  email: '',
  phone: '',
};

const customerFormSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  email: Yup.string().email('Email inválido'),
  phone: Yup.string().required('El teléfono es obligatorio'),
});

const CreateCustomerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof customerModel) => {
    try {
      await customerService.createCustomer(values);
      navigate('/customer');
    } catch (error) {
      alert('Failed to create customer.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={customerModel}
        validationSchema={customerFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Customer"
        formTitle="Create Customer"
      />
    </div>
  );
};

export default CreateCustomerPage;
