import axios from 'axios';
import Shift from '../models/shift';

export class ShiftService {
    private baseUrl = `${import.meta.env.VITE_API_URL}/shifts`;

    async getShifts(filters?: {
        driver_id?: number;
        status?: Shift['status'];
        startTime?: string | Date;
        endTime?: string | Date;
    }): Promise<Shift[]> {
        const params: any = { ...filters };
        if (filters?.startTime && typeof filters.startTime !== 'string') params.startTime = (filters.startTime as Date).toISOString();
        if (filters?.endTime && typeof filters.endTime !== 'string') params.endTime = (filters.endTime as Date).toISOString();
        const response = await axios.get(this.baseUrl, { params });
        return response.data;
    }

    async getShiftById(id: number): Promise<Shift> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createShift(shift: Omit<Shift, 'id' | 'createdAt'>): Promise<Shift> {
        const response = await axios.post(this.baseUrl, shift);
        return response.data;
    }

    async updateShift(id: number, shift: Partial<Shift>): Promise<Shift> {
        const response = await axios.put(`${this.baseUrl}/${id}`, shift);
        return response.data;
    }

    async deleteShift(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async startShift(id: number): Promise<Shift> {
        const response = await axios.put(`${this.baseUrl}/${id}/start`);
        return response.data;
    }

    async endShift(id: number): Promise<Shift> {
        const response = await axios.put(`${this.baseUrl}/${id}/end`);
        return response.data;
    }
}

export default new ShiftService();

