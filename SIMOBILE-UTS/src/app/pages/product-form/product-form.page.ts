import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

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
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(1)]],
      sellingPrice: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
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
    const formData = this.productForm.value;
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.productIdToEdit) {
      this.productService.updateProduct(this.productIdToEdit, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    
    this.router.navigate(['/tabs/products']);
  }
}