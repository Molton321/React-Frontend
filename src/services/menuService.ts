import axios from 'axios';
import Menu from '../models/menu';

const BASE_URL = `${import.meta.env.VITE_API_URL}/menus`;

export class MenuService {
    private baseUrl = BASE_URL;

    async getMenus(): Promise<Menu[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getMenuById(id: number): Promise<Menu> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async getMenuByRestaurant(restaurant_id: number): Promise<Menu[]> {
        const response = await axios.get(`${this.baseUrl}/restaurant/${restaurant_id}`);
        return response.data;
    }

    async createMenu(menu: Omit<Menu, 'id' | 'createdAt'>): Promise<Menu> {
        const response = await axios.post(this.baseUrl, menu);
        return response.data;
    }

    async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu> {
        const response = await axios.put(`${this.baseUrl}/${id}`, menu);
        return response.data;
    }

    async deleteMenu(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async updateAvailability(menuId: number, availability: boolean): Promise<Menu> {
        const response = await axios.put(`${this.baseUrl}/${menuId}/availability`, { availability });
        return response.data;
    }
}

export default new MenuService();

