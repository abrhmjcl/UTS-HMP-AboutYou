import { CartItem } from './cart-item.model';

export interface Transaction {
    id: number;
    date: Date;
    items: CartItem[];
    totalAmount: number;
}
