import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import userService from "../../services/userService";
import ListTable from "../../components/Table/ListTable";

const List = () => {

    const [data, setData] = useState<User[]>([]);
    
        // 🔹 Llamar `fetchData` cuando el componente se monta
        useEffect(() => {
            fetchData()
        }, []);
    
        // 🔹 Obtiene los datos de los usuarios
        const fetchData = async () => {
            const users = await userService.getUsers();  //Esto se denomina un hook (archivo con colecciones de metodos que son muy frecuentes de usar)
            setData(users);
        };

    return (
        <>
            <Breadcrumb pageName="Usuarios" />
            <ListTable<User> fetchData={userService.getUsers} onDelete={userService.deleteUser}/>
        </>
    );
};
export default List;