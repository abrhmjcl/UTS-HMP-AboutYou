import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.models';
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
    private animationCtrl: AnimationController
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

  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
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