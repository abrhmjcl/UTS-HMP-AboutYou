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
    let items = this.cartItems;
    let item: CartItem | null = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === productId) {
        item = items[i];
        break;
      }
    }

    if (item != null) {
      const success = this.cartService.updateQuantity(productId, item.quantity + 1);
      if (!success) {
        this.toastMessage = `Stok ${item.product.name} maksimum telah tercapai`;
        this.isToastOpen = true;
      }
      this.updatePage();
    }
  }

  decreaseQty(productId: number) {
    let items = this.cartItems;
    let item: CartItem | null = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].product.id === productId) {
        item = items[i];
        break;
      }
    }

    if (item != null) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
      this.updatePage();
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.updatePage();
  }

  checkoutButtons = [
    {
      text: 'Batal',
      role: 'cancel'
    },
    {
      text: 'Checkout',
      handler: () => {
        this.processCheckout();
      }
    }
  ];

  processCheckout() {
    let items = this.cartItems;
    this.transactionService.createTransaction(items, this.cartTotal);
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = this.productService.getProductById(item.product.id);
         
      if (product != null) {
        product.stock = product.stock - item.quantity;
        this.productService.updateProduct(product.id, product);
      }
    }

    this.cartService.clearCart();
    this.updatePage();
    this.router.navigate(['/tabs/transactions']);
  }
}
