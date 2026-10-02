import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  profit: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.product = this.productService.getProductById(id);

      if (this.product) {
        this.profit = this.product.sellingPrice - this.product.purchasePrice;
      }
    }
  }

  addToCart() {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product);
      this.router.navigate(['/cart']);
    }
  }

  editProduct() {
    if (this.product) {
      this.router.navigate(['/product-form'], { queryParams: { id: this.product.id } });
    }
  }
}