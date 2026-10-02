import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private products: Product[] = [
        {
            id: 1,
            name: 'Beras Premium 5kg',
            category: 'Makanan Pokok',
            description: 'Beras putih',
            purchasePrice: 55000,
            sellingPrice: 65000,
            stock: 25,
            imageUrl: ''
        },
        {
            id: 2,
            name: 'Minyak Goreng Bimoli 2L',
            category: 'Makanan Pokok',
            description: 'Minyak goreng sawit 2L',
            purchasePrice: 28000,
            sellingPrice: 35000,
            stock: 15,
            imageUrl: ''
        },
        {
            id: 3,
            name: 'Gula Pasir 1kg',
            category: 'Makanan Pokok',
            description: 'Gula pasir 1 kg',
            purchasePrice: 12000,
            sellingPrice: 15000,
            stock: 30,
            imageUrl: ''
        },
        {
            id: 4,
            name: 'Indomie Goreng',
            category: 'Makanan Instan',
            description: 'Mi goreng sedap',
            purchasePrice: 2500,
            sellingPrice: 3500,
            stock: 100,
            imageUrl: ''
        },
        {
            id: 5,
            name: 'Teh Botol Sosro 450ml',
            category: 'Minuman',
            description: 'Teh manis dalam kemasan botol',
            purchasePrice: 3000,
            sellingPrice: 5000,
            stock: 50,
            imageUrl: ''
        },
        {
            id: 6,
            name: 'Sabun Cuci Piring Sunlight 800ml',
            category: 'Kebutuhan Rumah',
            description: 'Sabun cuci piring',
            purchasePrice: 10000,
            sellingPrice: 14000,
            stock: 20,
            imageUrl: ''
        },
        {
            id: 7,
            name: 'Kopi Kapal Api 165g',
            category: 'Minuman',
            description: 'Kopi kapal api special',
            purchasePrice: 8000,
            sellingPrice: 12000,
            stock: 0,
            imageUrl: ''
        },
        {
            id: 8,
            name: 'Deterjen Rinso 900g',
            category: 'Kebutuhan Rumah',
            description: 'Deterjen untuk mencuci pakaian',
            purchasePrice: 15000,
            sellingPrice: 20000,
            stock: 12,
            imageUrl: ''
        },
        {
            id: 9,
            name: 'Telur Ayam 1kg',
            category: 'Makanan Pokok',
            description: 'Telur ayam negeri per kg',
            purchasePrice: 22000,
            sellingPrice: 28000,
            stock: 8,
            imageUrl: ''
        },
        {
            id: 10,
            name: 'Aqua Botol 600ml',
            category: 'Minuman',
            description: 'Air mineral kemasan botol 600ml',
            purchasePrice: 2000,
            sellingPrice: 3500,
            stock: 0,
            imageUrl: ''
        }
    ];

    private nextId = 11;

    constructor() { }

    getAllProducts(): Product[] {
        return this.products;
    }
    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
    searchProducts(keyword: string): Product[] {
        if (!keyword || keyword.trim() === '') {
            return this.products;
        }
        const lowerKeyword = keyword.toLowerCase();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(lowerKeyword) ||
            p.category.toLowerCase().includes(lowerKeyword)
        );
    }
    getTotalProductCount(): number {
        return this.products.length;
    }
    addProduct(product: Omit<Product, 'id'>): void {
        const newProduct: Product = {
            ...product,
            id: this.nextId++
        };
        this.products.push(newProduct);
    }
    updateProduct(id: number, updatedData: Partial<Product>): boolean {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
            return true;
        }
        return false;
    }
    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
    updateStock(productId: number, quantitySold: number): boolean {
        const product = this.getProductById(productId);
        if (product && product.stock >= quantitySold) {
            product.stock -= quantitySold;
            return true;
        }
        return false;
    }
}
