import Infringement from "../models/infringement";
import api from "../interceptors/axiosInterceptor";

const BASE_URL = `${import.meta.env.VITE_SUSTENTACION_API_URL}/infringements`;
export class InfringementService {
    private baseUrl = BASE_URL;

    async getInfringements(): Promise<Infringement[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getInfringementById(id: number): Promise<Infringement | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createInfringement(infringement: Omit<Infringement, 'id' | 'createdAt'>): Promise<Infringement | null> {
        try {
            const response = await api.post(this.baseUrl, infringement);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateInfringement(id: number, infringement: Partial<Infringement>): Promise<Infringement | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, infringement);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
export default new InfringementService();