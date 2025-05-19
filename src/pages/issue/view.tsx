import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Issue from '../../models/issue';
import issueService from '../../services/issueService';
import { useParams } from 'react-router-dom';

const issueFormSchema = Yup.object({
    motorcycle_id: Yup.number().required('La moto es obligatoria'),
    description: Yup.string().required('La descripción es obligatoria'),
    issue_type: Yup.string().required('El tipo de issue es obligatorio'),
    date_reported: Yup.date().required('La fecha es obligatoria'),
    status: Yup.string().required('El estado es obligatorio'),
});

const ViewIssuePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [issueModel, setIssueModel] = useState<Issue | null>(null);

    useEffect(() => {
        if (id) {
            issueService.getIssueById(Number(id)).then(data => {
                setIssueModel(data);
            });
        }
    }, [id]);

    if (!issueModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Ver Issue {id}</h1>
            <UniversalForm
                model={issueModel}
                validationSchema={issueFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                issuesOptions={['accident', 'breakdown', 'maintenance']}
                statusOptions={['open', 'in_progress', 'resolved', 'closed']}
            />
        </div>
    );
};

export default ViewIssuePage;
