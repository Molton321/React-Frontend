import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Product from '../../models/product';
import productService from '../../services/productService';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleSubmit = async (values: Product ) => {
    try {
      await productService.createProduct(values);
      navigate('/product');
    } catch (error) {
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={productModel}
        validationSchema={productFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        formTitle="Create Product"
      />
    </div>
  );
};

export default CreateProductPage;
