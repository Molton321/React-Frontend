import axios from 'axios';
import Product from '../models/product';

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

export class ProductService {
    private baseUrl = BASE_URL;

    async getProducts(filters?: {
        category?: string;
    }): Promise<Product[]> {
        const response = await axios.get(this.baseUrl, { params: filters });
        return response.data;
    }

    async getProductById(id: number): Promise<Product> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
        const response = await axios.post(this.baseUrl, product);
        return response.data;
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        const response = await axios.put(`${this.baseUrl}/${id}`, product);
        return response.data;
    }

    async deleteProduct(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default new ProductService();

