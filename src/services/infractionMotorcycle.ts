import api from '../interceptors/axiosInterceptor';
import infractionMotorcycle from '../models/infractionMotorcycle';

const BASE_URL = `${import.meta.env.VITE_SUSTENTATION_URL}`;

export class infractionMotorcycleService {
    private baseUrl = BASE_URL;

    async getInfractionMotorcycle(filters?: {
    }): Promise<infractionMotorcycle[]> {
        try {
            const response = await api.get(`${this.baseUrl}/infringements`);
            
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async createInfractionMotorcycle(issue: Omit<infractionMotorcycle, 'id' | 'createdAt'>): Promise<infractionMotorcycle | null> {
        try {
            const response = await api.post(`${this.baseUrl}/motorcycle-infringement`, issue);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateInfractionMotorcycle(id: number, issue: Partial<infractionMotorcycle>): Promise<infractionMotorcycle | null> {
        try {
            const response = await api.put(`${this.baseUrl}/motorcycle-infringement/${id}`, issue);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteIssue(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async resolveIssue(id: number, resolution: string): Promise<infractionMotorcycle | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}/resolve`, { resolution });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new infractionMotorcycleService();

