import { Injectable} from "@angular/core";
import { CartItem } from '../models/cart-item.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private transactions: Transaction[] = [];
    private nextId = 1;

    constructor() {}


    getAllTransactions(): Transaction[]{
        return this.transactions;
    }

    getTransactionsById(id: number): Transaction | undefined {
        return this.transactions.find(t => t.id === id);
    }

    getTodayTransactions(): Transaction[] {
        const today = new Date(); 
        return this.transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getFullYear() === today.getFullYear() &&
                tDate.getMonth() === today.getMonth() &&
                tDate.getDate() === today.getDate();
        });
    }

    getTodayTotalSales(): number {
        return this.getTodayTransactions().reduce(
            (total, t) => total + t.totalAmount, 0);
    }

    getTodayTransactionCount(): number {
        return this.getTodayTransactions().length;
    }


    getBestSellingProductToday(): { productName: string; quantity: number} | null {
        const todayTransactions = this.getTodayTransactions();

        if (todayTransactions.length === 0) {
            return null;
        }

        const productSales: { [key: string]: number } = {};

        for (const transaction of todayTransactions) {
            for (const item of transaction.items) {
                const name = item.product.name;
                if (productSales[name]) {
                    productSales[name] += item.quantity;
                }else{
                    productSales[name] = item.quantity;
                }
            }
        }

        let bestProduct = '';
        let maxQuantity = 0;

        for(const [name, qty] of Object.entries(productSales)) {
            if (qty > maxQuantity) {
                maxQuantity = qty;
                bestProduct = name;
            }
        }
    

        return { productName: bestProduct, quantity: maxQuantity };
    }

        createTransaction(items: CartItem[], totalAmount: number): Transaction {
            const transaction: Transaction = {
                id : this.nextId++,
                date: new Date(),
                items: items.map(item => ({ ...item })),
                totalAmount: totalAmount
        };
        this.transactions.push(transaction);
        return transaction;
        }
    }
