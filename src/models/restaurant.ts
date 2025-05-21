interface Restaurant {
    id: number;
    name: string;
    address:string;
    phone: string;
    email?: string;    
    createdAt: Date;
}

export default Restaurant;

