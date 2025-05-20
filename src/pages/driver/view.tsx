import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Driver from '../../models/driver';
import driverService from '../../services/driverService';
import { useParams } from 'react-router-dom';

const driverFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    license_number: Yup.string().required('El número de licencia es obligatorio'),
    phone: Yup.string().required('El teléfono es obligatorio'),
    email: Yup.string().email('Debe ser un email válido'),
    status: Yup.string().required('El estado es obligatorio'),
});

const ViewDriverPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [driverModel, setDriverModel] = useState<Driver | null>(null);

    useEffect(() => {
        if (id) {
            driverService.getDriverById(Number(id)).then(data => {
                setDriverModel(data);
            });
        }
    }, [id]);

    if (!driverModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={driverModel}
                validationSchema={driverFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                statusOptions={['available', 'busy', 'offline']}
                formTitle={`Ver Conductor ${id}`}
            />
        </div>
    );
};

export default ViewDriverPage;
