import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Address from '../../models/address';
import addressService from '../../services/addressService';
import { useParams } from 'react-router-dom';

const addressFormSchema = Yup.object({
    order_id: Yup.string().required('El ID de la orden es obligatorio'),
    street: Yup.string().required('La calle es obligatoria'),
    city: Yup.string().required('La ciudad es obligatoria'),
    state: Yup.string().required('El estado es obligatorio'),
    postal_code: Yup.string().required('El código postal es obligatorio'),
    aditional_info: Yup.string(),
});

const ViewAddressPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [addressModel, setAddressModel] = useState<Address | null>(null);

    useEffect(() => {
        if (id) {
            addressService.getAddressById(Number(id)).then(data => {
                setAddressModel(data);
            });
        }
    }, [id]);

    if (!addressModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Ver Dirección {id}</h1>
            <UniversalForm
                model={addressModel}
                validationSchema={addressFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
            />
        </div>
    );
};

export default ViewAddressPage;
