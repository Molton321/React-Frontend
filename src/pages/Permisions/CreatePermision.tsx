import React, { useState } from 'react'; // Asegúrate de importar useState
import { Permision } from '../../models/Permision';
import PermisionFormValidator from '../../components/Permisions/PermisionFormValidator'; 

import Swal from 'sweetalert2';
import { createPermision } from "../../services/permisionService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    // Estado para almacenar el usuario a editar

    // Lógica de creación
    const handleCreatePermision = async (Permision: Permision) => {

        try {
            const createdPermision = await createPermision(Permision);
            if (createdPermision) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdPermision);
                navigate("/Permisions");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo permiso */}
            <h2>Create Permision</h2>
                <Breadcrumb pageName="Crear permiso" />
                <PermisionFormValidator
                    handleCreate={handleCreatePermision}
                    mode={1} // 1 significa creación
                />
        </div>
    );
};

export default App;
