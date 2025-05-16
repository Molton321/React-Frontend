import axios from 'axios';
import Restaurant from '../models/restaurant';

const BASE_URL = '/restaurants';

export class RestaurantService {
    private baseUrl = BASE_URL;

    async getRestaurants(): Promise<Restaurant[]> {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRestaurantById(id: number): Promise<Restaurant | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createRestaurant(restaurant: Omit<Restaurant, 'id' | 'createdAt'>): Promise<Restaurant | null> {
        try {
            const response = await axios.post(this.baseUrl, restaurant);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${id}`, restaurant);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteRestaurant(id: number): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new RestaurantService();

