import { User } from "../models/user";
import { store } from "../stores/store";
import { setUser } from "../stores/userSlice";

class SecurityService extends EventTarget {  //
    keySession: string;
    API_URL: string;
    user: User;
    theAuthProvider: any;
    constructor() {
        super();

        this.keySession = 'session';
        this.API_URL = import.meta.env.VITE_API_URL || ""; // Reemplaza con la URL real
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        } else {
            this.user = {}
        }
    }

    async login(user: User) {
        console.log("llamando api " + `${this.API_URL}/login`)
        try {

            const response = await fetch(`${this.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            //localStorage.setItem("user", JSON.stringify(data));
            store.dispatch(setUser(data)); //ESTO SE UTILIZA PARA MANEJAR VARIABLES DE GLOBALES
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
    getUser() {
        return this.user;
    }
    logout() {
        this.user = {};
        localStorage.removeItem("user");
        this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
    }

    isAuthenticated() {
        return localStorage.getItem(this.keySession) !== null;
    }

    getToken() {
        return localStorage.getItem(this.keySession);
    }
}

export default new SecurityService();
