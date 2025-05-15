import axios from 'axios';
import Restaurant from '../models/restaurant';

const BASE_URL = `${import.meta.env.VITE_API_URL}/restaurants`;

export class RestaurantService {
    private baseUrl = BASE_URL;

    async getRestaurants(): Promise<Restaurant[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getRestaurantById(id: number): Promise<Restaurant> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createRestaurant(restaurant: Omit<Restaurant, 'id' | 'createdAt'>): Promise<Restaurant> {
        const response = await axios.post(this.baseUrl, restaurant);
        return response.data;
    }

    async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant> {
        const response = await axios.put(`${this.baseUrl}/${id}`, restaurant);
        return response.data;
    }

    async deleteRestaurant(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default new RestaurantService();

