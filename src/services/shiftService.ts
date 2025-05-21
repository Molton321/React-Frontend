import api from '../interceptors/axiosInterceptor';
import Shift from '../models/shift';

export class ShiftService {
    private baseUrl = `${import.meta.env.VITE_API_URL}/shifts`;

    async getShifts(filters?: {
        driver_id?: number;
        status?: Shift['status'];
        start_time?: string | Date;
        end_time?: string | Date;
    }): Promise<Shift[]> {
        try {
            const params: any = { ...filters };
            if (filters?.start_time && typeof filters.start_time !== 'string') params.start_time = (filters.start_time as Date).toISOString();
            if (filters?.end_time && typeof filters.end_time !== 'string') params.end_time = (filters.end_time as Date).toISOString();
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

