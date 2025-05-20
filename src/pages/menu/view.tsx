import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Menu from '../../models/menu';
import menuService from '../../services/menuService';
import { useParams } from 'react-router-dom';

const menuFormSchema = Yup.object({
    restaurant_id: Yup.number().required('El restaurante es obligatorio'),
    product_id: Yup.number().required('El producto es obligatorio'),
    price: Yup.number().required('El precio es obligatorio'),
    availability: Yup.boolean().required('La disponibilidad es obligatoria'),
});

const ViewMenuPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [menuModel, setMenuModel] = useState<Menu | null>(null);

    useEffect(() => {
        if (id) {
            menuService.getMenuById(Number(id)).then(data => {
                setMenuModel(data);
            });
        }
    }, [id]);

    if (!menuModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={menuModel}
                validationSchema={menuFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                formTitle={`Ver Menú ${id}`}
            />
        </div>
    );
};

export default ViewMenuPage;
