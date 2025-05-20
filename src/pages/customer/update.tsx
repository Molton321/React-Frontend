import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Customer from '../../models/customer';
import customerService from '../../services/customerService';
import { useParams, useNavigate } from 'react-router-dom';

const customerFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Debe ser un email válido'),
    phone: Yup.string().required('El teléfono es obligatorio'),
});

const UpdateCustomerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customerModel, setCustomerModel] = useState<Customer | null>(null);

    useEffect(() => {
        if (id) {
            customerService.getCustomerById(Number(id)).then(data => {
                setCustomerModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Customer) => {
        try {
            await customerService.updateCustomer(values.id, values);
            navigate('/customer');
        } catch (error) {
            alert('Failed to update customer.');
        }
    };

    if (!customerModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={customerModel}
                validationSchema={customerFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Customer"
                formTitle={`Update Customer ${id}`}
            />
        </div>
    );
};

export default UpdateCustomerPage;
