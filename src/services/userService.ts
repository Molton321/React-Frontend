import api from '../interceptors/axiosInterceptor';
import User from '../models/user';
export class UserService {
    private baseUrl = `${import.meta.env.VITE_API_URL}/users`;

    async getUsers(): Promise<User[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createUser(user: Omit<User, 'id'>): Promise<User | null> {
        try {
            const response = await api.post(this.baseUrl, user);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, user);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new UserService();
