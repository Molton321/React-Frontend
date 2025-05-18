import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Menu from '../../models/menu';
import menuService from '../../services/menuService';

const menuModel: Omit<Menu, 'id' | 'createdAt'> = {
  restaurant_id: 0,
  product_id: 0,
  price: 0,
  availability: false,
};

const menuFormSchema = Yup.object({
  restaurant_id: Yup.number().typeError('Debe ser un número').required('El ID del restaurante es obligatorio'),
  product_id: Yup.number().typeError('Debe ser un número').required('El ID del producto es obligatorio'),
  price: Yup.number().typeError('Debe ser un número').required('El precio es obligatorio'),
  availability: Yup.boolean(),
});

const CreateMenuPage: React.FC = () => {
  const handleSubmit = async (values: typeof menuModel) => {
    try {
      await menuService.createMenu(values);
      alert('Menu created successfully!');
    } catch (error) {
      alert('Failed to create menu.');
    }
  };

  return (
    <div>
      <h1>Create Menu</h1>
      <UniversalForm
        model={menuModel}
        validationSchema={menuFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Menu"
      />
    </div>
  );
};

export default CreateMenuPage;
