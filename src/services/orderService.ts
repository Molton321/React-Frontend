import api from '../interceptors/axiosInterceptor';
import Order from '../models/order';

const BASE_URL = `${import.meta.env.VITE_API_URL}/orders`;

export class OrderService {
    private baseUrl = BASE_URL;

    async getOrders(filters?: {
        status?: Order['status'];
        customer_id?: number;
        menu_id?: number;
        motorcycle_id?: number;
    }): Promise<Order[]> {
        try {
            const response = await api.get(this.baseUrl, { params: filters });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getOrderById(id: number): Promise<Order | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order | null> {
        try {
            const response = await api.post(this.baseUrl, order);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, order);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateOrderStatus(id: number, status: Order['status']): Promise<Order | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}/status`, { status });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteOrder(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new OrderService();

