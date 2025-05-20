import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Issue from '../../models/issue';
import issueService from '../../services/issueService';
import { useParams, useNavigate } from 'react-router-dom';

const issueFormSchema = Yup.object({
    motorcycle_id: Yup.number().required('La moto es obligatoria'),
    description: Yup.string().required('La descripción es obligatoria'),
    issue_type: Yup.string().required('El tipo de issue es obligatorio'),
    date_reported: Yup.date().required('La fecha es obligatoria'),
    status: Yup.string().required('El estado es obligatorio'),
});

const UpdateIssuePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [issueModel, setIssueModel] = useState<Issue | null>(null);

    useEffect(() => {
        if (id) {
            issueService.getIssueById(Number(id)).then(data => {
                setIssueModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Issue) => {
        try {
            await issueService.updateIssue(values.id, values);
            navigate('/issue');
        } catch (error) {
            alert('Failed to update issue.');
        }
    };

    if (!issueModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={issueModel}
                validationSchema={issueFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Issue"
                issuesOptions={['Accident', 'Breakdown', 'Maintenance']}
                statusOptions={['open', 'in_progress', 'resolved']}
                formTitle={`Update Issue ${id}`}
            />
        </div>
    );
};

export default UpdateIssuePage;