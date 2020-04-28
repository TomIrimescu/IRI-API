import { Document } from 'mongoose';

export interface Product extends Document {
    // readonly id: number,
    name: string,
    category: string,
    description: string,
    price: number
}
