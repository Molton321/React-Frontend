interface Issue {
    id: number;
    motorcycle_id: number;
    description: Text;
    issue_type: string;
    date_reported: Date;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    createdAt: Date;
}

export default Issue;

