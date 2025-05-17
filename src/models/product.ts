interface Product {
    id: number;
    name: string;
    description?: Text;
    price: number;
    category?: string;    
    createdAt: Date;
}

export default Product;

