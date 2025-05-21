import MotorcycleInfringement from "../models/motorcycleInfringement";
import api from "../interceptors/axiosInterceptor";

const BASE_URL = `${import.meta.env.VITE_SUSTENTACION_API_URL}/motorcycle-infringement`;
export class MotorcycleInfringementService {

    private baseUrl = BASE_URL;

    async getMotorcycleInfringements(): Promise<MotorcycleInfringement[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getMotorcycleInfringementById(id: number): Promise<MotorcycleInfringement | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createMotorcycleInfringement(motorcycleInfringement: Omit<MotorcycleInfringement, 'id' | 'createdAt'>): Promise<MotorcycleInfringement | null> {
        try {
            const response = await api.post(this.baseUrl, motorcycleInfringement);
            return response.data;   
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateMotorcycleInfringement(id: number, motorcycleInfringement: Partial<MotorcycleInfringement>): Promise<MotorcycleInfringement | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, motorcycleInfringement);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new MotorcycleInfringementService();