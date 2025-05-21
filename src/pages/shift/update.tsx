import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Shift from '../../models/shift';
import shiftService from '../../services/shiftService';
import { useParams, useNavigate } from 'react-router-dom';

const shiftFormSchema = Yup.object({
    driver_id: Yup.number().required('El conductor es obligatorio'),
    motorcycle_id: Yup.number().required('La moto es obligatoria'),
    start_time: Yup.date().required('La hora de inicio es obligatoria'),
    end_time: Yup.date().notRequired(),
    status: Yup.string().required('El estado es obligatorio'),
});

const UpdateShiftPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [shiftModel, setShiftModel] = useState<Shift | null>(null);

    useEffect(() => {
        if (id) {
            shiftService.getShiftById(Number(id)).then(data => {
                setShiftModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Shift) => {
        try {
            console.log('Creating shift with values:', values);
            await shiftService.updateShift(values.id, values);
            navigate('/shift');
        } catch (error) {
            alert('Failed to update shift.');
        }
    };

    if (!shiftModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={shiftModel}
                validationSchema={shiftFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Shift"
                formTitle={`Update Shift ${id}`}
            />
        </div>
    );
};

export default UpdateShiftPage;