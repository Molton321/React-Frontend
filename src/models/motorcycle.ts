interface Motorcycle {
    id: number;
    licensePlate: string;
    brand: string;
    year: number;
    status: 'active' | 'maintenance' | 'retired';
    createdAt: Date;
}

export default Motorcycle;

