import api from '../interceptors/axiosInterceptor';
import infraction from '../models/infraction';

const BASE_URL = `${import.meta.env.VITE_SUSTENTATION_URL}/infringements`;

export class InfractionService {
  private baseUrl = BASE_URL;

  async getInfractions(filters?: Partial<infraction>): Promise<infraction[]> {
    try {
      const params = { ...filters };
      const response = await api.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getInfractionById(id: number): Promise<infraction | null> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default new InfractionService();

