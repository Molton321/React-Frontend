interface Issue {
    id: number;
    motorcycle_id: number;
    description: string;
    issue_type: 'accident' | 'breakdown' | 'maintenance';
    date_reported: Date;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    createdAt: Date;
}

export default Issue;

