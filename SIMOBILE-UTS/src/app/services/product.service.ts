import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private static products: Product[] = [
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
            name: 'Gula Pasir Gulaku 1kg',
            category: 'Bahan Kue',
            description: 'Gula tebu',
            purchasePrice: 12000,
            sellingPrice: 15000,
            stock: 30,
            imageUrl: ''
        },
        {
            id: 4,
            name: 'Indomie Goreng',
            category: 'Makanan Instan',
            description: 'Mie instan goreng',
            purchasePrice: 2500,
            sellingPrice: 3000,
            stock: 100,
            imageUrl: ''
        },
        {
            id: 5,
            name: 'Telur Ayam 1kg',
            category: 'Protein',
            description: 'Telur ayam segar',
            purchasePrice: 24000,
            sellingPrice: 28000,
            stock: 20,
            imageUrl: ''
        },
        {
            id: 6,
            name: 'Susu Kental Manis Frisian Flag',
            category: 'Minuman',
            description: 'Susu kental manis',
            purchasePrice: 9000,
            sellingPrice: 12000,
            stock: 40,
            imageUrl: ''
        },
        {
            id: 7,
            name: 'Tepung Terigu Segitiga Biru 1kg',
            category: 'Bahan Kue',
            description: 'Tepung terigu protein sedang',
            purchasePrice: 10000,
            sellingPrice: 13000,
            stock: 25,
            imageUrl: ''
        },
        {
            id: 8,
            name: 'Kopi Kapal Api Mix',
            category: 'Minuman',
            description: 'Kopi instan dengan gula',
            purchasePrice: 11000,
            sellingPrice: 14000,
            stock: 50,
            imageUrl: ''
        },
        {
            id: 9,
            name: 'Teh Celup Sariwangi',
            category: 'Minuman',
            description: 'Teh celup isi 25',
            purchasePrice: 5000,
            sellingPrice: 7000,
            stock: 35,
            imageUrl: ''
        },
        {
            id: 10,
            name: 'Kecap Bango 600ml',
            category: 'Bumbu Dapur',
            description: 'Kecap manis kedelai hitam',
            purchasePrice: 20000,
            sellingPrice: 24000,
            stock: 15,
            imageUrl: ''
        }
    ];

    private static nextId = 11;

    constructor() {}

    getAllProducts(): Product[] {
        return ProductService.products;
    }

    getProductById(id: number): Product | undefined {
        for (let i = 0; i < ProductService.products.length; i++) {
            if (ProductService.products[i].id === id) {
                return ProductService.products[i];
            }
        }
        return undefined;
    }

    addProduct(product: Product) {
        product.id = ProductService.nextId++;
        ProductService.products.push(product);
    }

    updateProduct(id: number, updatedData: any): boolean {
        for (let i = 0; i < ProductService.products.length; i++) {
            if (ProductService.products[i].id === id) {
                ProductService.products[i].name = updatedData.name;
                
                ProductService.products[i].stock = updatedData.stock;
                if (updatedData.category) {
                    ProductService.products[i].category = updatedData.category;
                }
                if (updatedData.description) {
                    ProductService.products[i].description = updatedData.description;
                }
                if (updatedData.imageUrl) {
                    ProductService.products[i].imageUrl = updatedData.imageUrl;
                }
                if (updatedData.purchasePrice) {
                    ProductService.products[i].purchasePrice = updatedData.purchasePrice;
                }
                if (updatedData.sellingPrice) {
                    ProductService.products[i].sellingPrice = updatedData.sellingPrice;
                }
                return true;
            }
        }
        return false;
    }

    deleteProduct(id: number): boolean {
        let index = -1;
        for (let i = 0; i < ProductService.products.length; i++) {
            if (ProductService.products[i].id === id) {
                index = i;
                break;
            }
        }
        
        if (index !== -1) {
            const newProducts: Product[] = [];
            for (let i = 0; i < ProductService.products.length; i++) {
                if (i !== index) {
                    newProducts.push(ProductService.products[i]);
                }
            }
            ProductService.products = newProducts;
            return true;
        }
        return false;
    }

    getTotalProductCount(): number {
        return ProductService.products.length;
    }
}
