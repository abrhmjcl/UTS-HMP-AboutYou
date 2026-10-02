import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/lazy';
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

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = [...this.cartService.getCartItems()];
    this.cartTotal = this.cartService.getCartTotal();
  }

  increaseQty(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
      this.loadCart();
    }
  }

  decreaseQty(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
      this.loadCart();
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  async confirmCheckout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Checkout',
      message: `Total belanja Anda Rp ${this.cartTotal.toLocaleString('id-ID')}. Lanjutkan?`,
      buttons: [
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
      ]
    });

    await alert.present();
  }

  processCheckout() {
    const transaction = this.transactionService.createTransaction(this.cartItems, this.cartTotal);
    this.cartItems.forEach(item => {
      const product = this.productService.getProductById(item.product.id);
      if (product) {
        this.productService.updateProduct(product.id, {
          ...product, stock: product.stock - item.quantity
        });
      }
    });

    this.cartService.clearCart();
    this.loadCart();

    this.router.navigate(['/tabs/transactions']);
  }
}
