interface Order {
    id: number;
    customer_id: number;
    menu_id: number;
    motorcycle_id?: number;
    quantity: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'in_progress' | 'delivered' | 'cancelled';
    createdAt: Date;

}

export default Order;

