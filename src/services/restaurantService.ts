import api from '../interceptors/axiosInterceptor';
import Restaurant from '../models/restaurant';

const BASE_URL = `${import.meta.env.VITE_API_URL}/restaurants`;

export class RestaurantService {
    private baseUrl = BASE_URL;

    async getRestaurants(): Promise<Restaurant[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRestaurantById(id: number): Promise<Restaurant | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createRestaurant(restaurant: Omit<Restaurant, 'id' | 'createdAt'>): Promise<Restaurant | null> {
        try {
            const response = await api.post(this.baseUrl, restaurant);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, restaurant);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteRestaurant(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new RestaurantService();

