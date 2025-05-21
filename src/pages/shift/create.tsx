import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Shift from '../../models/shift';
import shiftService from '../../services/shiftService';
import { useNavigate } from 'react-router-dom';


const shiftModel: Omit<Shift, 'id' | 'createdAt'> = {
  driver_id: 0,
  motorcycle_id: 0,
  start_time: new Date(),
  end_time: undefined,
  status: 'scheduled',
};

const shiftFormSchema = Yup.object({
  driver_id: Yup.number().typeError('Debe ser un número').required('El ID del conductor es obligatorio'),
  motorcycle_id: Yup.number().typeError('Debe ser un número').required('El ID de la moto es obligatorio'),
  start_time: Yup.date().typeError('Debe ser una fecha').required('La hora de inicio es obligatoria'),
  end_time: Yup.date().typeError('Debe ser una fecha').notRequired(),
  status: Yup.string().required('El estado es obligatorio'),
});

const CreateShiftPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof shiftModel) => {
    try {
      console.log('Creating shift with values:', values);
      await shiftService.createShift(values as Omit<Shift, 'id' | 'createdAt'>);
      navigate('/shift');
    } catch (error) {
      alert('Failed to create shift.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={shiftModel}
        validationSchema={shiftFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Shift"
        statusOptions={['scheduled', 'in_progress', 'completed', 'cancelled']}
        formTitle="Create Shift"
      />
    </div>
  );
};

export default CreateShiftPage;
