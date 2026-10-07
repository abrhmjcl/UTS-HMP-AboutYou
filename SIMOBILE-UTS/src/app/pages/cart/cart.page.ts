import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  isToastOpen = false;
  toastMessage = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
  }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
  }

  updatePage() {
    const items = this.cartService.getCartItems();
    this.cartItems = [];
    for (let i = 0; i < items.length; i++) {
      this.cartItems.push(items[i]);
    }
    this.cartTotal = this.cartService.getCartTotal();
  }

  trackByItemId(index: number, item: CartItem) {
    return item.product.id;
  }

  increaseQty(productId: number) {
    this.cartService.increaseQty(productId);
    this.updatePage();
  }


  decreaseQty(productId: number) {
    this.cartService.decreaseQty(productId);
    this.updatePage();
  }


  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.updatePage();
  }

    processCheckout() {
    this.cartService.checkout();
    this.updatePage();
    this.router.navigate(['/tabs/transactions']);
  }

}


