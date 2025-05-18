import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Product from '../../models/product';
import productService from '../../services/productService';

const productModel: Product = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  category: '',
  createdAt: new Date(),
};
const productFormSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  description: Yup.string(),
  price: Yup.number().typeError('Debe ser un número').required('El precio es obligatorio'),
  category: Yup.string(),
});

const CreateProductPage: React.FC = () => {
  const handleSubmit = async (values: Product ) => {
    try {
      await productService.createProduct(values);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <UniversalForm
        model={productModel}
        validationSchema={productFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Product"
      />
    </div>
  );
};

export default CreateProductPage;
