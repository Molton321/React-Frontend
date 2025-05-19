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

const ViewOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [orderModel, setOrderModel] = useState<Order | null>(null);

    useEffect(() => {
        if (id) {
            orderService.getOrderById(Number(id)).then(data => {
                setOrderModel(data);
            });
        }
    }, [id]);

    if (!orderModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Ver Orden {id}</h1>
            <UniversalForm
                model={orderModel}
                validationSchema={orderFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                statusOptions={['pending', 'confirmed', 'in_progress', 'delivered', 'cancelled']}
            />
        </div>
    );
};

export default ViewOrderPage;
