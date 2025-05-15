import axios from 'axios';
import Issue from '../models/issue';

const BASE_URL = `${import.meta.env.VITE_API_URL}/issues`;

export class IssueService {
    private baseUrl = BASE_URL;

    async getIssues(filters?: {
        status?: Issue['status'];
        issue_type?: string;
    }): Promise<Issue[]> {
        const response = await axios.get(this.baseUrl, { params: filters });
        return response.data;
    }

    async getIssueById(id: number): Promise<Issue> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createIssue(issue: Omit<Issue, 'id' | 'createdAt'>): Promise<Issue> {
        const response = await axios.post(this.baseUrl, issue);
        return response.data;
    }

    async updateIssue(id: number, issue: Partial<Issue>): Promise<Issue> {
        const response = await axios.put(`${this.baseUrl}/${id}`, issue);
        return response.data;
    }

    async deleteIssue(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    async resolveIssue(id: number, resolution: string): Promise<Issue> {
        const response = await axios.put(`${this.baseUrl}/${id}/resolve`, { resolution });
        return response.data;
    }
}

export default new IssueService();

