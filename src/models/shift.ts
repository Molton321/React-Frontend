interface Shift {
    id: number;
    driver_id: number;
    motorcycle_id: number;
    startTime: Date;
    endTime?: Date;
    status: 'scheduled' | 'active' | 'completed' | 'cancelled';
    createdAt: Date;
}

export default Shift;

