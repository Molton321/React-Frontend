import axios from 'axios';
import Address from '../models/address';

const BASE_URL = `${import.meta.env.VITE_API_URL}/addresses`;

export class AddressService {
    private baseUrl = BASE_URL;

    async getAddresses(): Promise<Address[]> {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getAddressById(id: number): Promise<Address> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createAddress(address: Omit<Address, 'id' | 'createdAt'>): Promise<Address> {
        const response = await axios.post(this.baseUrl, address);
        return response.data;
    }

    async updateAddress(id: number, address: Partial<Address>): Promise<Address> {
        const response = await axios.put(`${this.baseUrl}/${id}`, address);
        return response.data;
    }

    async deleteAddress(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async getAddressesByCustomer(customerId: number): Promise<Address[]> {
        const response = await axios.get(`${this.baseUrl}/customer/${customerId}`);
        return response.data;
    }
}

export default new AddressService();

