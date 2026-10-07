import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { TransactionService } from './transaction.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private static cartItems: CartItem[] = [];

    constructor(private productService: ProductService, private transactionService: TransactionService) {}

    getCartItems(): CartItem[] {
        return CartService.cartItems;
    }

    addToCart(product: Product): boolean {
        let existingItem: CartItem | null = null;
        for (let i = 0; i < CartService.cartItems.length; i++) {
            if (CartService.cartItems[i].product.id === product.id) {
                existingItem = CartService.cartItems[i];
                break;
            }
        }

        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity += 1;
                existingItem.subtotal = existingItem.quantity * product.sellingPrice;
                return true;
            } else {
                return false; 
            }
        } else {
            if (product.stock > 0) {
                const newItem: CartItem = {
                    product: product,
                    quantity: 1,
                    subtotal: product.sellingPrice
                };
                CartService.cartItems.push(newItem);
                return true;
            } else {
                return false; 
            }
        }
    }

    updateQuantity(productId: number, quantity: number): boolean {
        let existingItem: CartItem | null = null;
        for (let i = 0; i < CartService.cartItems.length; i++) {
            if (CartService.cartItems[i].product.id === productId) {
                existingItem = CartService.cartItems[i];
                break;
            }
        }

        if (existingItem) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
                return true;
            } else if (quantity <= existingItem.product.stock) {
                existingItem.quantity = quantity;
                existingItem.subtotal = existingItem.quantity * existingItem.product.sellingPrice;
                return true;
            }
        }
        return false;
    }

    removeFromCart(productId: number): void {
        const newCart: CartItem[] = [];
        for (let i = 0; i < CartService.cartItems.length; i++) {
            if (CartService.cartItems[i].product.id !== productId) {
                newCart.push(CartService.cartItems[i]);
            }
        }
        CartService.cartItems = newCart;
    }

    clearCart(): void {
        CartService.cartItems = [];
    }

    

    getCartTotal(): number {
        let total = 0;
        for (let i = 0; i < CartService.cartItems.length; i++) {
            total += CartService.cartItems[i].subtotal;
        }
        return total;
    }

    increaseQty(productId: number): void {
        let item = null;
        for (let i = 0; i < CartService.cartItems.length; i++) {
            if (CartService.cartItems[i].product.id === productId) {
                item = CartService.cartItems[i];
                break;
            }
        }
        if (item != null) {
            this.updateQuantity(productId, item.quantity + 1);
        }
    }

    decreaseQty(productId: number): void {
        let item = null;
        for (let i = 0; i < CartService.cartItems.length; i++) {
            if (CartService.cartItems[i].product.id === productId) {
                item = CartService.cartItems[i];
                break;
            }
        }
        if (item != null) {
            this.updateQuantity(productId, item.quantity - 1);
        }
    }

    checkout(): void {
        const items = CartService.cartItems;
        this.transactionService.createTransaction(items, this.getCartTotal());
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const product = this.productService.getProductById(item.product.id);
               
            if (product != null) {
                product.stock = product.stock - item.quantity;
                this.productService.updateProduct(product.id, product);
            }
        }
        this.clearCart();
    }
}

