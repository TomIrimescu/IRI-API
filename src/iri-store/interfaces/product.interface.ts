import { Document } from 'mongoose';

export interface Product extends Document {
    readonly id: number;
    readonly name: string;
    readonly category: string;
    readonly description: string;
    readonly price: number;
}