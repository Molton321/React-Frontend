import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Customer from '../../models/customer';
import customerService from '../../services/customerService';
import { useParams } from 'react-router-dom';

const customerFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Debe ser un email válido'),
    phone: Yup.string().required('El teléfono es obligatorio'),
});

const ViewCustomerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customerModel, setCustomerModel] = useState<Customer | null>(null);

    useEffect(() => {
        if (id) {
            customerService.getCustomerById(Number(id)).then(data => {
                setCustomerModel(data);
            });
        }
    }, [id]);

    if (!customerModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={customerModel}
                validationSchema={customerFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                formTitle={`Ver Cliente ${id}`}
            />
        </div>
    );
};

export default ViewCustomerPage;
