import api from '../interceptors/axiosInterceptor';
import Issue from '../models/issue';

const BASE_URL = `${import.meta.env.VITE_API_URL}/issues`;

export class IssueService {
    private baseUrl = BASE_URL;

    async getIssues(filters?: {
        status?: Issue['status'];
        issue_type?: string;
    }): Promise<Issue[]> {
        try {
            const response = await api.get(this.baseUrl, { params: filters });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getIssueById(id: number): Promise<Issue | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createIssue(issue: Omit<Issue, 'id' | 'createdAt'>): Promise<Issue | null> {
        try {
            const response = await api.post(this.baseUrl, issue);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateIssue(id: number, issue: Partial<Issue>): Promise<Issue | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}`, issue);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteIssue(id: number): Promise<boolean> {
        try {
            await api.delete(`${this.baseUrl}/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async resolveIssue(id: number, resolution: string): Promise<Issue | null> {
        try {
            const response = await api.put(`${this.baseUrl}/${id}/resolve`, { resolution });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new IssueService();

