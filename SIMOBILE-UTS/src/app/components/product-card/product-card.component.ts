import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() viewDetailEvent = new EventEmitter<number>();

  constructor() {}

  get defaultImage(): string {
    return this.product.imageUrl && this.product.imageUrl.trim() !== '' 
      ? this.product.imageUrl 
      : 'assets/images/default-product.png';
  }

  onAddToCart(event: Event) {
<<<<<<< HEAD
    event.stopPropagation();
=======
    event.stopPropagation(); // Mencegah klik kartu saat tombol diklik
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
    this.addToCartEvent.emit(this.product);
  }

  onViewDetail() {
    this.viewDetailEvent.emit(this.product.id);
  }
}
