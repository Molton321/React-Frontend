import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Address from '../../models/address';
import addressService from '../../services/addressService';
import { useNavigate } from 'react-router-dom';

const addressModel: Omit<Address, 'id' | 'createdAt'> = {
  order_id: 0,
  street: '',
  city: '',
  state: '',
  postal_code: '',
  aditional_info: '',
};

const addressFormSchema = Yup.object({
  order_id: Yup.string().required('El ID de la orden es obligatorio'),
  street: Yup.string().required('La calle es obligatoria'),
  city: Yup.string().required('La ciudad es obligatoria'),
  state: Yup.string().required('El estado es obligatorio'),
  postal_code: Yup.string().required('El código postal es obligatorio'),
  aditional_info: Yup.string(),
});

const CreateAddressPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof addressModel) => {
    try {
      await addressService.createAddress(values);
      navigate('/address/list');
    } catch (error) {
      alert('Failed to create address.');
    }
  };

  // Aquí puedes agregar la lógica para enviar los datos a tu API o backend

  return (
    <div>
      <UniversalForm
        model={addressModel}
        validationSchema={addressFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Address"
        formTitle="Create Address"
      />
    </div>
  );
};

export default CreateAddressPage;
