import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.models';
<<<<<<< HEAD
import { AnimationController, ToastController } from '@ionic/angular/lazy';
=======
import { AnimationController } from '@ionic/angular/lazy';
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
import { fadeInProductsAnimation } from '../../animations/product-fade-in.animation';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false,
})
export class ProductListPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
<<<<<<< HEAD
    private animationCtrl: AnimationController,
    private toastCtrl: ToastController
=======
    private animationCtrl: AnimationController
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.loadProducts();
    this.filterProducts();
  }

  loadProducts() {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredProducts = [...this.products];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
      );
    }
  }

<<<<<<< HEAD
  async handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
    const toast = await this.toastCtrl.create({
      message: `${product.name} ditambahkan ke keranjang`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
=======
  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
  }

  handleViewDetail(productId: number) {
    this.router.navigate(['/tabs/product-detail', productId]);
  }

 
  
  fadeInProducts() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      const anim = this.animationCtrl.create()
        .addElement(card as HTMLElement)
        .duration(500)
        .delay(index * 100)
        .iterations(1)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(20px)' },
          { offset: 1, opacity: '1', transform: 'translateY(0)' }
        ]);
      anim.play();
    });
  }

  ionViewDidEnter() {
    this.fadeInProducts();
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
