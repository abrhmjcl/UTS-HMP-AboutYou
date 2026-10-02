<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
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
<<<<<<< HEAD
export class CartPage implements OnInit {
=======
export class CartPage {
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private router: Router,
    private alertController: AlertController
<<<<<<< HEAD
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = [...this.cartService.getCartItems()];
=======
  ) { }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
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
<<<<<<< HEAD
=======

    // Update stok produk
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
    this.cartItems.forEach(item => {
      const product = this.productService.getProductById(item.product.id);
      if (product) {
        this.productService.updateProduct(product.id, {
<<<<<<< HEAD
          ...product, stock: product.stock - item.quantity
=======
          stock: product.stock - item.quantity
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
        });
      }
    });

    this.cartService.clearCart();
    this.loadCart();
<<<<<<< HEAD
  
=======

    // Arahkan ke riwayat transaksi (Tab 3: Transaksi)
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
    this.router.navigate(['/tabs/transactions']);
  }
}
