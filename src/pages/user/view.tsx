import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import { User } from '../../models/user';
import { UserService } from '../../services/userService';
import { useParams } from 'react-router-dom';

const userFormSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string().email('Debe ser un email válido'),
    password: Yup.string(),
    age: Yup.number(),
    city: Yup.string(),
    phone: Yup.string(),
    is_active: Yup.boolean(),
});

const userService = new UserService();

const ViewUserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userModel, setUserModel] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            userService.getUserById(Number(id)).then(data => {
                setUserModel(data);
            });
        }
    }, [id]);

    if (!userModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={userModel}
                validationSchema={userFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                formTitle={`Ver Usuario ${id}`}
            />
        </div>
    );
};

export default ViewUserPage;
