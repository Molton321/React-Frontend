
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPermisionById, updatePermision } from "../../services/permisionService";
import Swal from "sweetalert2";

import { Permision } from '../../models/Permision';
import PermisionFormValidator from '../../components/Permisions/PermisionFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdatePermisionPage = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [Permision, setPermision] = useState<Permision | null>(null);

    // Cargar datos del usuario después del montaje
    useEffect(() => {
        console.log("Id->"+id)
        const fetchPermision = async () => {
            if (!id) return; // Evitar errores si el ID no está disponible
            const PermisionData = await getPermisionById(parseInt(id));
            setPermision(PermisionData);
        };

        fetchPermision();
    }, [id]);

    const handleUpdatePermision = async (thePermision: Permision) => {
        try {
            const updatedPermision = await updatePermision(thePermision.id || 0, thePermision);
            if (updatedPermision) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/Permisions"); // Redirección en React Router
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!Permision) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar permiso" />
            <PermisionFormValidator
                handleUpdate={handleUpdatePermision}
                mode={2} // 2 significa actualización
                permision={Permision}
            />
        </>
    );
};

export default UpdatePermisionPage;