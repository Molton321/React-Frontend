import api from '../interceptors/axiosInterceptor';
import Menu from '../models/menu';

const BASE_URL = `${import.meta.env.VITE_API_URL}/menus`;

export class MenuService {
    private baseUrl = BASE_URL;

    async getMenus(): Promise<Menu[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getMenuById(id: number): Promise<Menu | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getMenuByRestaurant(restaurant_id: number): Promise<Menu[] | null> {
        try {
            const response = await api.get(`${this.baseUrl}/restaurant/${restaurant_id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createMenu(menu: Omit<Menu, 'id' | 'createdAt'>): Promise<Menu | null> {
        try {
            const response = await api.post(this.baseUrl, menu);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, menu);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteMenu(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateAvailability(menuId: number, availability: boolean): Promise<Menu | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${menuId}/availability`, { availability });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new MenuService();

