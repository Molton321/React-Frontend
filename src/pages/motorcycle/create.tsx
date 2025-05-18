import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Motorcycle from '../../models/motorcycle';
import motorcycleService from '../../services/motorcycleService';

const motorcycleModel: Omit<Motorcycle, 'id' | 'createdAt'> = {
  licensePlate: '',
  brand: '',
  year: 0,
  status: 'active',
};

const motorcycleFormSchema = Yup.object({
  licensePlate: Yup.string().required('La placa es obligatoria'),
  brand: Yup.string().required('La marca es obligatoria'),
  year: Yup.number().typeError('Debe ser un número').required('El año es obligatorio'),
  status: Yup.string().required('El estado es obligatorio'),
});

const CreateMotorcyclePage: React.FC = () => {
  const handleSubmit = async (values: typeof motorcycleModel) => {
    try {
      await motorcycleService.createMotorcycle(values);
      alert('Motorcycle created successfully!');
    } catch (error) {
      alert('Failed to create motorcycle.');
    }
  };

  return (
    <div>
      <h1>Create Motorcycle</h1>
      <UniversalForm
        model={motorcycleModel}
        validationSchema={motorcycleFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Motorcycle"
      />
    </div>
  );
};

export default CreateMotorcyclePage;
