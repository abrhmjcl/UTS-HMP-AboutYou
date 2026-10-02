import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    constructor() { }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    getCartTotal(): number {
        return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
    }

    getCartItemCount(): number {
        return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }


    addToCart(product: Product, quantity: number = 1): void {
        const existingItem = this.cartItems.find(
            item => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.subtotal = existingItem.product.sellingPrice * existingItem.quantity;
        } else {
            this.cartItems.push({
                product: product,
                quantity: quantity,
                subtotal: product.sellingPrice * quantity
            });
        }
    }

    updateQuantity(productId: number, quantity: number): void {
        const item = this.cartItems.find(i => i.product.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                item.subtotal = item.product.sellingPrice * quantity;
            }
        }
    }

    removeFromCart(productId: number): void {
        this.cartItems = this.cartItems.filter(
            item => item.product.id !== productId
        );
    }

    clearCart(): void {
        this.cartItems = [];
    }
}
