import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ListTableProps<T> {
    fetchData: () => Promise<T[]>; // Función para obtener los datos
    onDelete: (id: number) => Promise<boolean>; // Función para eliminar un registro
}

const ListTable = <T extends { id?: number }>({ fetchData, onDelete }: ListTableProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        fetchDataAndSet();
    }, []);

    const fetchDataAndSet = async () => {
        const items = await fetchData();
        setData(items);
        if (items.length > 0) {
            setColumns(Object.keys(items[0])); // Extrae las claves dinámicamente
        }
    };

    const handleView = (id: number) => {
        console.log(`Ver registro con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar registro con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await onDelete(id);
                if (success) {
                    Swal.fire({ title: "Eliminado", text: "El registro se ha eliminado", icon: "success" });
                    fetchDataAndSet(); // Vuelve a obtener los datos
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Listado</h3>
                    </div>
                    <div className="overflow-x-auto p-6.5">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col} className="px-6 py-3">{col}</th>
                                    ))}
                                    <th className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} className="border-b bg-white dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                                        {columns.map((col) => (
                                            <td key={col} className="px-6 py-4">{String(item[col as keyof T])}</td>
                                            
                                        ))}
                                        <td className="px-6 py-4 space-x-2">
                                            <button onClick={() => handleView(item.id ?? 0)} className="text-blue-600 dark:text-blue-500">
                                                <Eye size={20} />
                                            </button>
                                            <button onClick={() => item.id !== undefined && handleEdit(item.id)} className="text-yellow-600 dark:text-yellow-500">
                                                <Edit size={20} />
                                            </button>
                                            <button onClick={() => item.id !== undefined && handleDelete(item.id)} className="text-red-600 dark:text-red-500">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListTable;