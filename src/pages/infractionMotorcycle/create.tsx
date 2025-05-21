import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import infractionMotorcycle from '../../models/infractionMotorcycle';
import infractionMotorcycleService from '../../services/infractionMotorcycle';
import { useNavigate } from 'react-router-dom';
import infractionService from '../../services/infractionService';
import motorcycleService from '../../services/motorcycleService'; // <-- Importa el nuevo servicio

const infractionMotorcycleModel: Omit<infractionMotorcycle, 'id' | 'createdAt'> = {
  infraction_id: 0,
  motorcycle_id: '',
  infraction_date: new Date(),
};

const issueFormSchema = Yup.object({
  infraction_id: Yup.number().typeError('Debe ser un número').required('El ID de la infracción es obligatorio'),
  motorcycle_id: Yup.string().required('La placa de la moto es obligatoria'),
  infraction_date: Yup.date().typeError('Debe ser una fecha').required('La fecha es obligatoria'),
});

const CreateIssuePage: React.FC = () => {
  const navigate = useNavigate();
  const [infringementOptions, setInfringementOptions] = useState<string[]>([]);
  const [motorcycleOptions, setMotorcycleOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const infractions = await infractionService.getInfractions();
      setInfringementOptions(infractions.map(i => `${i.id}`));

      const motorcycles = await motorcycleService.getMotorcycles();
      const formattedMotos = motorcycles.map(m => `${m.id} - ${m.license_plate}`);
      setMotorcycleOptions(formattedMotos);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values: typeof infractionMotorcycleModel) => {
    try {
      await infractionMotorcycleService.createInfractionMotorcycle(values);
      alert('Infraction created successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to create infraction.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={infractionMotorcycleModel}
        validationSchema={issueFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Infraction Motorcycle"
        formTitle="Create Infraction Motorcycle"
        issuesOptions={infringementOptions}
        motorcyclesOptions={motorcycleOptions} // ✅ Se pasa aquí
      />
    </div>
  );
};

export default CreateIssuePage;
