import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Motorcycle from '../../models/motorcycle';
import motorcycleService from '../../services/motorcycleService';
import { useParams } from 'react-router-dom';

const motorcycleFormSchema = Yup.object({
    licensePlate: Yup.string().required('La placa es obligatoria'),
    brand: Yup.string().required('La marca es obligatoria'),
    year: Yup.number().required('El año es obligatorio'),
    status: Yup.string().required('El estado es obligatorio'),
});

const UpdateMotorcyclePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [motorcycleModel, setMotorcycleModel] = useState<Motorcycle | null>(null);

    useEffect(() => {
        if (id) {
            motorcycleService.getMotorcycleById(Number(id)).then(data => {
                setMotorcycleModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Motorcycle) => {
        try {
            await motorcycleService.updateMotorcycle(values.id, values);
            alert('Motorcycle updated successfully!');
        } catch (error) {
            alert('Failed to update motorcycle.');
        }
    };

    if (!motorcycleModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Update Motorcycle {id}</h1>
            <UniversalForm
                model={motorcycleModel}
                validationSchema={motorcycleFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Motorcycle"
            />
        </div>
    );
};

export default UpdateMotorcyclePage;