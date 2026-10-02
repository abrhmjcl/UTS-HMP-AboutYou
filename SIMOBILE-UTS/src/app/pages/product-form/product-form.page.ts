import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: false,
})
export class ProductFormPage implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;
  productIdToEdit: number | null = null;
  
  categories: string[] = ['Makanan Pokok', 'Makanan Instan', 'Minuman', 'Bumbu Dapur', 'Kebutuhan Rumah', 'Snack', 'Lainnya'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      description: [''],
      purchasePrice: ['', [Validators.required, Validators.min(1)]],
      sellingPrice: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productIdToEdit = parseInt(params['id'], 10);
        this.loadProductForEdit(this.productIdToEdit);
      }
    });
  }

  get f() {
    return this.productForm.controls;
  }

  loadProductForEdit(id: number) {
    const product = this.productService.getProductById(id);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        description: product.description,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        stock: product.stock,
        imageUrl: product.imageUrl
      });
    }
  }

 onSubmit() {
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const formData = this.productForm.value;
  
  if (this.isEditMode && this.productIdToEdit) {
    const updatedProduct: Product = {
      id: this.productIdToEdit,
      ...formData
    };
    console.log('Update Product:', updatedProduct);
  } else {
    const newProduct: Product = {
      id: new Date().getTime(),
      ...formData
    };
    console.log('Add Product:', newProduct);          
  }

  this.router.navigate(['/tabs/products']);
}
}
