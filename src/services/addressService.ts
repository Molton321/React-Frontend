import axios from 'axios';
import Address from '../models/address';

const BASE_URL = `${import.meta.env.VITE_API_URL}/addresses`;

export class AddressService {
    private baseUrl = BASE_URL;

    async getAddresses(): Promise<Address[]> {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAddressById(id: number): Promise<Address | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createAddress(address: Omit<Address, 'id' | 'createdAt'>): Promise<Address | null> {
        try {
            const response = await axios.post(this.baseUrl, address);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateAddress(id: number, address: Partial<Address>): Promise<Address | null> {
        try {
            const response = await axios.put(`${this.baseUrl}/${id}`, address);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteAddress(id: number): Promise<boolean> {
        try {
            await axios.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getAddressesByCustomer(customerId: number): Promise<Address[] | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/customer/${customerId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new AddressService();

