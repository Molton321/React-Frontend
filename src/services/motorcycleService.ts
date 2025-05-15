import axios from 'axios';
import Motorcycle from '../models/motorcycle';

const BASE_URL = `${import.meta.env.VITE_API_URL}/motorcycles`;

export class MotorcycleService {
    private baseUrl = BASE_URL;

    async getMotorcycles(): Promise<Motorcycle[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getMotorcycleById(id: number): Promise<Motorcycle> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createMotorcycle(motorcycle: Omit<Motorcycle, 'id' | 'createdAt'>): Promise<Motorcycle> {
        const response = await axios.post(this.baseUrl, motorcycle);
        return response.data;
    }

    async updateMotorcycle(id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle> {
        const response = await axios.put(`${this.baseUrl}/${id}`, motorcycle);
        return response.data;
    }

    async deleteMotorcycle(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async assignDriver(motorcycleId: number, driverId: number): Promise<Motorcycle> {
        const response = await axios.put(`${this.baseUrl}/${motorcycleId}/assign`, { driverId });
        return response.data;
    }

    async unassignDriver(motorcycleId: number): Promise<Motorcycle> {
        const response = await axios.put(`${this.baseUrl}/${motorcycleId}/unassign`, {});
        return response.data;
    }
}

export default new MotorcycleService();

