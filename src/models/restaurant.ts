interface Restaurant {
    id: number;
    name: string;
    description: string;
    address:string;
    phone: string;
    email?: string;    
    createdAt: Date;
}

export default Restaurant;

