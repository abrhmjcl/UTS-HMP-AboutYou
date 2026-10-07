import { Injectable} from "@angular/core";
import { CartItem } from '../models/cart-item.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    // Menggunakan static agar 1000% aman dari bug multiple instances di Ionic Lazy Loading
    private static transactions: Transaction[] = [];
    private static nextId = 1;

    constructor() {}


    getAllTransactions(): Transaction[] {
        return TransactionService.transactions;
    }

    getTransactionsById(id: number): Transaction | undefined {
        for (let i = 0; i < TransactionService.transactions.length; i++) {
            if (TransactionService.transactions[i].id === id) {
                return TransactionService.transactions[i];
            }
        }
        return undefined;
    }

    getTodayTransactions(): Transaction[] {
        const today = new Date();
        const result: Transaction[] = [];
        for (let i = 0; i < TransactionService.transactions.length; i++) {
            const t = TransactionService.transactions[i];
            const tDate = new Date(t.date);
            if (tDate.getFullYear() === today.getFullYear() &&
                tDate.getMonth() === today.getMonth() &&
                tDate.getDate() === today.getDate()) {
                result.push(t);
            }
        }
        return result;
    }

    getTodayTotalSales(): number {
        const todayTxs = this.getTodayTransactions();
        let total = 0;
        for (let i = 0; i < todayTxs.length; i++) {
            total += todayTxs[i].totalAmount;
        }
        return total;
    }

    getTodayTransactionCount(): number {
        return this.getTodayTransactions().length;
    }


    getBestSellingProductToday(): { productName: string; quantity: number} {
        const todayTransactions = this.getTodayTransactions();

        if (todayTransactions.length === 0) {
            return { productName: '-', quantity: 0 };
        }

        const productSales: any = {};

        for (let i = 0; i < todayTransactions.length; i++) {
            const transaction = todayTransactions[i];
            for (let j = 0; j < transaction.items.length; j++) {
                const item = transaction.items[j];
                const name = item.product.name;
                if (productSales[name]) {
                    productSales[name] += item.quantity;
                } else {
                    productSales[name] = item.quantity;
                }
            }
        }

        let bestProduct = '';
        let maxQuantity = 0;

        const keys = Object.keys(productSales);
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            if (productSales[name] > maxQuantity) {
                maxQuantity = productSales[name];
                bestProduct = name;
            }
        }

        if (bestProduct === '') {
            return { productName: '-', quantity: 0 };
        }

        return { productName: bestProduct, quantity: maxQuantity };
    }

    createTransaction(items: CartItem[], totalAmount: number): Transaction {
        const clonedItems: CartItem[] = [];
        for (let i = 0; i < items.length; i++) {
            clonedItems.push({
                product: items[i].product,
                quantity: items[i].quantity,
                subtotal: (items[i].product.sellingPrice * items[i].quantity)
            });
        }

        const transaction: Transaction = {
            id : TransactionService.nextId++,
            date: new Date(),
            items: clonedItems,
            totalAmount: totalAmount
        };
        TransactionService.transactions.push(transaction);
        return transaction;
    }
}