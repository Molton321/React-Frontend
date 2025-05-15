import axios from 'axios';
import Photo from '../models/photo';

const BASE_URL = `${import.meta.env.VITE_API_URL}/photos`;

export class PhotoService {
    private baseUrl = BASE_URL;

    async getPhotos(filters?: {
        issue_id?: number;
    }): Promise<Photo[]> {
        const response = await axios.get(this.baseUrl, { params: filters });
        return response.data;
    }

    async getPhotoById(id: number): Promise<Photo> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async uploadPhoto(issue_id: number, photo: FormData, options?: {
        caption?: string;
    }): Promise<Photo> {
        const response = await axios.post(
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
    }
}

export default new PhotoService();

