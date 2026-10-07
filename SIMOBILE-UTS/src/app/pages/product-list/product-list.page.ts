import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { AnimationController } from '@ionic/angular/lazy';
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
    private animationCtrl: AnimationController,
    
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.loadProducts();
    this.filterProducts();
  }

  loadProducts() {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = [];
    for (let i = 0; i < this.products.length; i++) {
      this.filteredProducts.push(this.products[i]);
    }
  }

  filterProducts() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredProducts = [];
      for (let i = 0; i < this.products.length; i++) {
        this.filteredProducts.push(this.products[i]);
      }
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = [];
      for (let i = 0; i < this.products.length; i++) {
        const p = this.products[i];
        if (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)) {
          this.filteredProducts.push(p);
        }
      }
    }
  }

  isToastOpen = false;
  toastMessage = '';
  toastColor = '';
  toastClass = '';

  handleAddToCart(product: Product) {
    const success = this.cartService.addToCart(product);
    
    if (success) {
      this.toastMessage = `${product.name} ditambahkan ke keranjang`;
      this.toastColor = '';
      this.toastClass = 'white-toast';
      this.isToastOpen = true;
    } else {
      this.toastMessage = `Stok ${product.name} tidak mencukupi`;
      this.toastColor = 'danger';
      this.toastClass = '';
      this.isToastOpen = true;
    }
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
}