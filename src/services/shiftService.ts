import api from '../interceptors/axiosInterceptor';
import Shift from '../models/shift';

export class ShiftService {
    private baseUrl = `${import.meta.env.VITE_API_URL}/shifts`;

    async getShifts(filters?: {
        driver_id?: number;
        status?: Shift['status'];
        startTime?: string | Date;
        endTime?: string | Date;
    }): Promise<Shift[]> {
        try {
            const params: any = { ...filters };
            if (filters?.startTime && typeof filters.startTime !== 'string') params.startTime = (filters.startTime as Date).toISOString();
            if (filters?.endTime && typeof filters.endTime !== 'string') params.endTime = (filters.endTime as Date).toISOString();
            const response = await api.get(this.baseUrl, { params });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getShiftById(id: number): Promise<Shift | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createShift(shift: Omit<Shift, 'id' | 'createdAt'>): Promise<Shift | null> {
        try {
            const response = await api.post(this.baseUrl, shift);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateShift(id: number, shift: Partial<Shift>): Promise<Shift | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, shift);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteShift(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new ShiftService();

