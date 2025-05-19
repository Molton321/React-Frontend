import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Shift from '../../models/shift';
import shiftService from '../../services/shiftService';
import { useParams } from 'react-router-dom';

const shiftFormSchema = Yup.object({
    driver_id: Yup.number().required('El conductor es obligatorio'),
    motorcycle_id: Yup.number().required('La moto es obligatoria'),
    startTime: Yup.date().required('La hora de inicio es obligatoria'),
    endTime: Yup.date().notRequired(),
    status: Yup.string().required('El estado es obligatorio'),
});

const ViewShiftPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [shiftModel, setShiftModel] = useState<Shift | null>(null);

    useEffect(() => {
        if (id) {
            shiftService.getShiftById(Number(id)).then(data => {
                setShiftModel(data);
            });
        }
    }, [id]);

    if (!shiftModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Ver Turno {id}</h1>
            <UniversalForm
                model={shiftModel}
                validationSchema={shiftFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                statusOptions={['scheduled', 'active', 'completed', 'cancelled']}
            />
        </div>
    );
};

export default ViewShiftPage;
