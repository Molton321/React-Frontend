import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Address from '../../models/address';
import addressService from '../../services/addressService';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const addressFormSchema = Yup.object({
    order_id: Yup.string().required('El ID de la orden es obligatorio'),
    street: Yup.string().required('La calle es obligatoria'),
    city: Yup.string().required('La ciudad es obligatoria'),
    state: Yup.string().required('El estado es obligatorio'),
    postal_code: Yup.string().required('El código postal es obligatorio'),
    aditional_info: Yup.string(),
});

const UpdateAddressPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [addressModel, setAddressModel] = useState<Address | null>(null);

    useEffect(() => {
        if (id) {
            addressService.getAddressById(Number(id)).then(data => {
                setAddressModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Address) => {
        try {
            await addressService.updateAddress(values.id, values);
            navigate('/address');
        } catch (error) {
            alert('Failed to update address.');
        }
    };

    if (!addressModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={addressModel}
                validationSchema={addressFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Address"
                formTitle={`Update Address ${id}`}
            />
        </div>
    );
};

export default UpdateAddressPage;
