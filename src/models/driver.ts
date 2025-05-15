interface Driver {
    id: number;
    name: string;
    license_number: string;
    phone: string;
    email?: string;
    status: 'available' | 'busy' | 'offline';
    createdAt: Date;
}

export default Driver;

