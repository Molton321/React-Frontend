interface Shift {
    id: number;
    driver_id: number;
    motorcycle_id: number;
    start_time: Date;
    end_time?: Date;
    status: 'scheduled' | 'active' | 'completed' | 'cancelled';
    createdAt: Date;
}

export default Shift;

