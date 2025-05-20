import api from '../interceptors/axiosInterceptor';
import Address from '../models/address';

const BASE_URL = `${import.meta.env.VITE_API_URL}/addresses`;

export class AddressService {
    private baseUrl = BASE_URL;

    async getAddresses(): Promise<Address[]> {
        try {
            const response = await api.get(this.baseUrl); // Use api instead of axios
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAddressById(id: number): Promise<Address | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`); // Use api
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createAddress(address: Omit<Address, 'id' | 'createdAt'>): Promise<Address | null> {
        try {
            const response = await api.post(this.baseUrl, address); // Use api
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateAddress(id: number, address: Partial<Address>): Promise<Address | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, address); // Use api
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteAddress(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`); // Use api
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getAddressesByCustomer(customerId: number): Promise<Address[] | null> {
        try {
            const response = await api.get(`${this.baseUrl}/customer/${customerId}`); // Use api
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new AddressService();