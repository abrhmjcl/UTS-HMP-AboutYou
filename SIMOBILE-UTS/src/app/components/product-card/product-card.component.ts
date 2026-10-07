import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

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
  imageError: boolean = false;

  constructor() { }


  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCartEvent.emit(this.product);
  }

  onViewDetail() {
    this.viewDetailEvent.emit(this.product.id);
  }

  get defaultImage(): string {
  if (this.imageError) return 'assets/images/default-product.png';
  
  return this.product.imageUrl && this.product.imageUrl.trim() !== ''
    ? this.product.imageUrl
    : 'assets/images/default-product.png';
  }

  onImageError() {
  this.imageError = true;
  }
}
