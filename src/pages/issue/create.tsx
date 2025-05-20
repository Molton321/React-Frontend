import React from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Issue from '../../models/issue';
import issueService from '../../services/issueService';
import { useNavigate } from 'react-router-dom';


const issueModel: Omit<Issue, 'id' | 'createdAt'> = {
  motorcycle_id: 0,
  description: '',
  issue_type: 'accident',
  date_reported: new Date(),
  status: 'open',
};

const issueFormSchema = Yup.object({
  motorcycle_id: Yup.number().typeError('Debe ser un número').required('El ID de la moto es obligatorio'),
  description: Yup.string().required('La descripción es obligatoria'),
  issue_type: Yup.string().required('El tipo de issue es obligatorio'),
  date_reported: Yup.date().typeError('Debe ser una fecha').required('La fecha es obligatoria'),
  status: Yup.string().required('El estado es obligatorio'),
});

const CreateIssuePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof issueModel) => {
    try {
      await issueService.createIssue(values as Omit<Issue, 'id' | 'createdAt'>);
      alert('Issue created successfully!');
      navigate('/issue');
    } catch (error) {
      alert('Failed to create issue.');
    }
  };

  return (
    <div>
      <UniversalForm
        model={issueModel}
        validationSchema={issueFormSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Issue"
        issuesOptions={['Accident', 'Breakdown', 'Maintenance']}
        statusOptions={['open', 'in_progress', 'resolved']}
        formTitle="Create Issue"
      />
    </div>
  );
};

export default CreateIssuePage;
