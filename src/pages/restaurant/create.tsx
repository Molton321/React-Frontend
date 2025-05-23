import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Restaurant from '../../models/restaurant';
import restaurantService from '../../services/restaurantService';
import { useNavigate } from 'react-router-dom';

const restaurantModel: Omit<Restaurant, 'id' | 'createdAt'> = {
  name: '',
  address: '',
  phone: '',
  email: '',
};

const restaurantFormSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  phone: Yup.string().required('El teléfono es obligatorio'), 
  email: Yup.string().email('Email inválido'),
});

const CreateRestaurantPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: Omit<Restaurant, 'id'|'createdAt'>) => {
    try {
      await restaurantService.createRestaurant(values);
      navigate('/restaurant');
    } catch (error) {
      alert('Failed to create restaurant.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={restaurantModel}
        validationSchema={restaurantFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Restaurant"
        formTitle="Create Restaurant"
      />
    </div>
  );
};

export default CreateRestaurantPage;
