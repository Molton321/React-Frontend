import axios from 'axios';
import Motorcycle from '../models/motorcycle';

const BASE_URL = `${import.meta.env.VITE_API_URL}/motorcycles`;

export class MotorcycleService {
    private baseUrl = BASE_URL;

    async getMotorcycles(): Promise<Motorcycle[]> {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getMotorcycleById(id: number): Promise<Motorcycle | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createMotorcycle(motorcycle: Omit<Motorcycle, 'id' | 'createdAt'>): Promise<Motorcycle | null> {
        try {
            const response = await axios.post(this.baseUrl, motorcycle);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateMotorcycle(id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${id}`, motorcycle);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteMotorcycle(id: number): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async assignDriver(motorcycleId: number, driverId: number): Promise<Motorcycle | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${motorcycleId}/assign`, { driverId });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async unassignDriver(motorcycleId: number): Promise<Motorcycle | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${motorcycleId}/unassign`, {});
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new MotorcycleService();

