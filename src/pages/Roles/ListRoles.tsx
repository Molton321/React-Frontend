import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { Role } from "../../models/Role";
import { deleteRole, getRoles } from "../../services/roleService";
import ListTable from "../../components/Table/ListTable";

const List = () => {

    const [data, setData] = useState<Role[]>([]);
    
        // 🔹 Llamar `fetchData` cuando el componente se monta
        useEffect(() => {
            fetchData()
        }, []);
    
        // 🔹 Obtiene los datos de los usuarios
        const fetchData = async () => {
            const roles = await getRoles();  //Esto se denomina un hook (archivo con colecciones de metodos que son muy frecuentes de usar)
            setData(roles);
        };

    return (
        <>
            <Breadcrumb pageName="Usuarios" />
            <ListTable<Role> fetchData={getRoles} onDelete={deleteRole}/>
        </>
    );
};
export default List;