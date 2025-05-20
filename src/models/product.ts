interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    category?: string;    
    createdAt: Date;
}

export default Product;

