import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { AnimationController } from '@ionic/angular';
import { addToCartBounceAnimation } from '../../animations/add-to-cart-bounce.animation';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  get profit(): number { return this.product ? this.product.sellingPrice - this.product.purchasePrice : 0; }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router, private animationCtrl: AnimationController
    
  ) { }

  ionViewWillEnter() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.product = this.productService.getProductById(id);
    }
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.product = this.productService.getProductById(id);

      
    }
  }

  isToastOpen = false;
  toastMessage = '';

  addToCart(event?: any) {
    if (event) {
      addToCartBounceAnimation(this.animationCtrl, event.target);
    }
    if (this.product && this.product.stock > 0) {
      const success = this.cartService.addToCart(this.product);
      if (success) {
        this.router.navigate(['/cart']);
      } else {
        this.toastMessage = `Stok ${this.product.name} tidak mencukupi`;
        this.isToastOpen = true;
      }
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/default-product.png';
  }

  editProduct() {
    if (this.product) {
      this.router.navigate(['/product-form'], { queryParams: { id: this.product.id } });
    }
  }
}





