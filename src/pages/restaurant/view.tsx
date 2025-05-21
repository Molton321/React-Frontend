import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Restaurant from '../../models/restaurant';
import restaurantService from '../../services/restaurantService';
import { useParams } from 'react-router-dom';

const restaurantFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    address: Yup.string().required('La dirección es obligatoria'),
    phone: Yup.string().required('El teléfono es obligatorio'),
    email: Yup.string().email('Debe ser un email válido'),
});

const ViewRestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurantModel, setRestaurantModel] = useState<Restaurant | null>(null);

    useEffect(() => {
        if (id) {
            restaurantService.getRestaurantById(Number(id)).then(data => {
                setRestaurantModel(data);
            });
        }
        console.log(restaurantModel);
    }, [id]);

    if (!restaurantModel) return <div>Cargando...</div>;

    return (
        <div>
            <UniversalForm
                model={restaurantModel}
                validationSchema={restaurantFormSchema}
                onSubmit={() => {}}
                submitLabel=""
                readOnly={true}
                formTitle={`Ver Restaurante ${id}`}
            />
        </div>
    );
};

export default ViewRestaurantPage;
