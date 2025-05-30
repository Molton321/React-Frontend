import api from '../interceptors/axiosInterceptor';
import Product from '../models/product';

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

export class ProductService {
    private baseUrl = BASE_URL;

    async getProducts(filters?: {
        category?: string;
    }): Promise<Product[]> {
        try {
            const response = await api.get(this.baseUrl, { params: filters });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product | null> {
        try {
            const response = await api.post(this.baseUrl, product);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, product);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteProduct(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new ProductService();

