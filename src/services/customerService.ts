import axios from 'axios';
import Customer from '../models/customer';

const BASE_URL = `${import.meta.env.VITE_API_URL}/customers`;

export class CustomerService {
    private baseUrl = BASE_URL;

    async getCustomers(): Promise<Customer[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getCustomerById(id: number): Promise<Customer> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
        const response = await axios.post(this.baseUrl, customer);
        return response.data;
    }

    async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer> {
        const response = await axios.put(`${this.baseUrl}/${id}`, customer);
        return response.data;
    }

    async deleteCustomer(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }
}

export default new CustomerService();

