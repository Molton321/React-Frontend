import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Order from '../../models/order';
import orderService from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const orderModel : Omit<Order,"id"|"createdAt"> = {
  customer_id: 0,
  menu_id: 0,
  motorcycle_id: 0,
  quantity: 0,
  total_price: 0,
  status: 'pending',
};

const orderFormSchema = Yup.object({
  customer_id: Yup.string().required('El ID del cliente es obligatorio'),
  menu_id: Yup.string().required('El ID del menú es obligatorio'),
  motorcycle_id: Yup.string(),
  quantity: Yup.number().typeError('Debe ser un número').required('La cantidad es obligatoria'),
  total_price: Yup.number().typeError('Debe ser un número').required('El precio total es obligatorio'),
  status: Yup.string().required('El estado es obligatorio'),
});

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: Omit<Order,"id"|"createdAt">) => {
    try {
      await orderService.createOrder(values)
      navigate('/order');
    } catch (error) {
      alert('Failed to create order.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={orderModel}
        validationSchema={orderFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Order"
        statusOptions={['pending','confirmed', 'in_progress', 'delivered', 'cancelled']}
        formTitle="Create Order"
      />
    </div>
  );
};

export default CreateOrderPage;
