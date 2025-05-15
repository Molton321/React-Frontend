import axios from 'axios';
import Driver from '../models/driver';

const BASE_URL = `${import.meta.env.VITE_API_URL}/drivers`;

export class DriverService {
    private baseUrl = BASE_URL;

    async getDrivers(): Promise<Driver[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getDriverById(id: number): Promise<Driver> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createDriver(driver: Omit<Driver, 'id' | 'createdAt'>): Promise<Driver> {
        const response = await axios.post(this.baseUrl, driver);
        return response.data;
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<Driver> {
        const response = await axios.put(`${this.baseUrl}/${id}`, driver);
        return response.data;
    }

    async deleteDriver(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async updateDriverStatus(id: number, status: Driver['status']): Promise<Driver> {
        const response = await axios.put(`${this.baseUrl}/${id}/status`, { status });
        return response.data;
    }
}

export default new DriverService();

