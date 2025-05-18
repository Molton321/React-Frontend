import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Restaurant from '../../models/restaurant';
import restaurantService from '../../services/restaurantService';

const restaurantModel: Omit<Restaurant, 'id' | 'createdAt'> = {
  name: '',
  description: '',
  address: '',
  phone: '',
  email: '',
};

const restaurantFormSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  address: Yup.string().required('La dirección es obligatoria'),
  phone: Yup.string().required('El teléfono es obligatorio'), 
  email: Yup.string().email('Email inválido'),
});

const CreateRestaurantPage: React.FC = () => {
  const handleSubmit = async (values: Omit<Restaurant, 'id'|'createdAt'>) => {
    try {
      await restaurantService.createRestaurant(values);
      alert('Restaurant created successfully!');
    } catch (error) {
      alert('Failed to create restaurant.');
    }
  };

  return (
    <div>
      <h1>Create Restaurant</h1>
      <UniversalForm
        model={restaurantModel}
        validationSchema={restaurantFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Restaurant"
      />
    </div>
  );
};

export default CreateRestaurantPage;
