import { Permision } from "../models/Permision";

const API_URL = import.meta.env.VITE_API_URL+"/permisions"||""; // Reemplaza con la URL real

// Obtener todos los usuarios
export const getPermisions = async (): Promise<Permision[]> => {
    console.log("aqui "+API_URL)
    try {
        const response = await fetch(API_URL); //LLama a la URL (axios mas optimo)
        if (!response.ok) throw new Error("Error al obtener permisos");
        return await response.json(); //Casteo a json
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un usuario por ID
export const getPermisionById = async (id: number): Promise<Permision | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Permiso no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo permiso
export const createPermision = async (user: Omit<Permision, "id">): Promise<Permision | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error al crear el permiso");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar permiso
export const updatePermision = async (id: number, user: Partial<Permision>): Promise<Permision | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error al actualizar rol");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar permiso
export const deletePermision = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar permiso");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};