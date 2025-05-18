import { Role } from "../models/Role";

const API_URL = import.meta.env.VITE_API_URL+"/roles"||""; // Reemplaza con la URL real

// Obtener todos los usuarios
export const getRoles = async (): Promise<Role[]> => {
    console.log("aqui "+API_URL)
    try {
        const response = await fetch(API_URL); //LLama a la URL (axios mas optimo)
        if (!response.ok) throw new Error("Error al obtener roles");
        return await response.json(); //Casteo a json
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un usuario por ID
export const getRoleById = async (id: number): Promise<Role | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Rol no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo rol
export const createRole = async (user: Omit<Role, "id">): Promise<Role | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error al crear el rol");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar permiso
export const updateRole = async (id: number, user: Partial<Role>): Promise<Role | null> => {
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

// Eliminar rol
export const deleteRole = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar rol");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};