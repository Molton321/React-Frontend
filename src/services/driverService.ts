import axios from 'axios';
import Driver from '../models/driver';

const BASE_URL = `${import.meta.env.VITE_API_URL}/drivers`;

export class DriverService {
    private baseUrl = BASE_URL;

    async getDrivers(): Promise<Driver[]> {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDriverById(id: number): Promise<Driver | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createDriver(driver: Omit<Driver, 'id' | 'createdAt'>): Promise<Driver | null> {
        try {
            const response = await axios.post(this.baseUrl, driver);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<Driver | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${id}`, driver);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteDriver(id: number): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateDriverStatus(id: number, status: Driver['status']): Promise<Driver | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${id}/status`, { status });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new DriverService();

