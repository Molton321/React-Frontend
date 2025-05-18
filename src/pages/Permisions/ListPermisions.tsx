import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { Permision } from "../../models/Permision";
import { deletePermision, getPermisions } from "../../services/permisionService";
import ListTable from "../../components/Table/ListTable";

const List = () => {
 

    const [data, setData] = useState<Permision[]>([]);
    
        // 🔹 Llamar `fetchData` cuando el componente se monta
        useEffect(() => {
            fetchData()
        }, []);
    
        // 🔹 Obtiene los datos de los usuarios
        const fetchData = async () => {
            const permisions = await getPermisions();  //Esto se denomina un hook (archivo con colecciones de metodos que son muy frecuentes de usar)
            setData(permisions);
        };

        const manejarAccion = (accion: String, item: any) => {
            if (accion === "editar") {
                console.log("Editar usuario:", item);
              } else if (accion === "eliminar") {
                console.log("Eliminar usuario:", item);
              }
        }

    return (
        <>
            <Breadcrumb pageName="Usuarios" />
            <ListTable<Permision> fetchData={getPermisions} onDelete={deletePermision}/>
        </>
    );
};
export default List;

// columnas={["id", "nombre", "email"]}  La idea es que esto sea un diccionario con nombre y tipo
// debo refactorizar todo, para aprender a hacerlo de la manera del curso.
// En manejar accion debo poner los llamados a los endpoitns de los servicios