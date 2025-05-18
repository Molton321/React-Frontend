
import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Restaurant from '../../models/restaurant';
import restaurantService from '../../services/restaurantService';
import { useParams } from 'react-router-dom';

const restaurantFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    address: Yup.string().required('La dirección es obligatoria'),
    phone: Yup.string().required('El teléfono es obligatorio'),
    email: Yup.string().email('Debe ser un email válido'),
});

const UpdateRestaurantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurantModel, setRestaurantModel] = useState<Restaurant | null>(null);

    useEffect(() => {
        if (id) {
            restaurantService.getRestaurantById(Number(id)).then(data => {
                setRestaurantModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Restaurant) => {
        try {
            await restaurantService.updateRestaurant(values.id, values);
            alert('Restaurant updated successfully!');
        } catch (error) {
            alert('Failed to update restaurant.');
        }
    };

    if (!restaurantModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Update Restaurant {id}</h1>
            <UniversalForm
                model={restaurantModel}
                validationSchema={restaurantFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Restaurant"
            />
        </div>
    );
};

export default UpdateRestaurantPage;
