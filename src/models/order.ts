interface Order {
    id: number;
    customer_id: number;
    menu_id: number;
    motorcycle_id?: number;
    quantity: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
    createdAt: Date;

}

export default Order;

