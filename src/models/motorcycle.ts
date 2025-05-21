interface Motorcycle {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: 'active' | 'maintenance' | 'retired';
    createdAt: Date;
}

export default Motorcycle;

