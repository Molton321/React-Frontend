import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Order from '../../models/order';
import orderService from '../../services/orderService';
import { useParams } from 'react-router-dom';

const orderFormSchema = Yup.object({
    customer_id: Yup.number().required('El cliente es obligatorio'),
    menu_id: Yup.number().required('El menú es obligatorio'),
    motorcycle_id: Yup.number().notRequired(),
    quantity: Yup.number().required('La cantidad es obligatoria'),
    total_price: Yup.number().required('El precio total es obligatorio'),
    status: Yup.string().required('El estado es obligatorio'),
});

const UpdateOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [orderModel, setOrderModel] = useState<Order | null>(null);

    useEffect(() => {
        if (id) {
            orderService.getOrderById(Number(id)).then(data => {
                setOrderModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Order) => {
        try {
            await orderService.updateOrder(values.id, values);
            alert('Order updated successfully!');
        } catch (error) {
            alert('Failed to update order.');
        }
    };

    if (!orderModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Update Order {id}</h1>
            <UniversalForm
                model={orderModel}
                validationSchema={orderFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Order"
                statusOptions={['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled']}
            />
        </div>
    );
};

export default UpdateOrderPage;