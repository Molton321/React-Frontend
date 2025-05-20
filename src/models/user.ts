

export interface User {
    //columns?: Record<string, "string" | "number" | "boolean" | "date">;
    id?: number;
    name?: string;
    email?: string;
    password?:string;
    age?: number;
    city?: string;
    phone?: string;
    is_active?: boolean;
    token?:string;
    birthdate?: string;
}


export default User;