interface Menu {
    id: number;
    restaurant_id: number;
    product_id: number;
    price: number;    
    availability: boolean;
    createdAt: Date;
}

export default Menu;

