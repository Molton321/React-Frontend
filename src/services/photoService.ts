import api from '../interceptors/axiosInterceptor';
import Photo from '../models/photo';

const BASE_URL = `${import.meta.env.VITE_API_URL}/photos`;

export class PhotoService {
    /**
     * Sube solo la imagen y devuelve la URL generada por el backend
     */
    async uploadImage(data: { file: File; issue_id: string | number; caption?: string; takenAt?: string }): Promise<string | null> {
        try {
            const formData = new FormData();
            formData.append('file', data.file);
            formData.append('issue_id', String(data.issue_id));
            if (data.caption) formData.append('caption', data.caption);
            if (data.takenAt) formData.append('takenAt', data.takenAt);
            const response = await api.post(`${this.baseUrl}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data[0].image_url || response.data[0].url || response.data[0].path || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    /**
     * Crea una foto usando JSON plano (sin archivo, solo URL)
     */
    async createPhoto(photo: Partial<Photo>): Promise<Photo | null> {
        try {
            const response = await api.post(this.baseUrl, photo);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Actualiza una foto existente (PUT)
     */
    async updatePhoto(id: number, photo: Partial<Photo>): Promise<Photo | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, photo);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    private baseUrl = BASE_URL
    async getPhotos(filters?: {
        issue_id?: number;
    }): Promise<Photo[]> {
        try {
            const response = await api.get(this.baseUrl, { params: filters });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getPhotoById(id: number): Promise<Photo | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async uploadPhotoInfo(issue_id: number, photo: FormData, options?: {
        caption?: string;
    }): Promise<Photo | null> {
        try {
            const response = await api.post(
                `${this.baseUrl}/upload/${issue_id}`,
                photo,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: options,
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async deletePhoto(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new PhotoService();

