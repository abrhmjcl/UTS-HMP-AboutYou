import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private static cartItems: CartItem[] = [];

    constructor() {}

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
}