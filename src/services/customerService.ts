import api from '../interceptors/axiosInterceptor';
import Customer from '../models/customer';

const BASE_URL = `${import.meta.env.VITE_API_URL}/customers`;

export class CustomerService {
    private baseUrl = BASE_URL;

    async getCustomers(): Promise<Customer[]> {
        try {
            const response = await api.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer | null> {
        try {
            const response = await api.post(this.baseUrl, customer);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, customer);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteCustomer(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new CustomerService();

