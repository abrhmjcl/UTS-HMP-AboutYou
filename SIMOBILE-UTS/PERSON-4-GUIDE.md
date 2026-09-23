# 🎨 PERSON 4 — UI/UX, DASHBOARD & TRANSACTION HISTORY SPECIALIST
# COMPLETE STEP-BY-STEP GUIDE

> **Role**: UI/UX, Dashboard & Transaction History Specialist  
> **Tugas Utama**: Custom theme, dark mode, animasi, dashboard, riwayat transaksi, profile
> **Estimasi Waktu**: 4–6 jam  
> **Prasyarat**: Project base dari Person 1 sudah di-push ke GitHub  
> **Tech Stack**: Ionic CLI 7 · Ionic Framework 9 · Angular 22 · TypeScript · SCSS (NgModules)  
> ⚠️ **Angular 22**: Semua `@Component` harus punya `standalone: false`.
> **UTS Requirements Covered**: #1 (Profil — Tab 4), #2 (Dashboard), #8 (Custom Theme & Dark Mode), #9 (Animasi), #11 (Riwayat Transaksi)

---

## 📖 DAFTAR ISI

| Phase | Judul | Status |
|-------|-------|--------|
| [PHASE 1](#phase-1--prerequisite-clone--setup) | Prerequisite: Clone & Setup | ☐ |
| [PHASE 2](#phase-2--create-shared-components-module-optional--best-practice) | Create Shared Components Module (Optional / Best Practice) | ☐ |
| [PHASE 3](#phase-3--implement-product-card-component-recommended) | Implement product-card Component (Recommended) | ☐ |
| [PHASE 4](#phase-4--implement-empty-state-component-recommended) | Implement empty-state Component (Recommended) | ☐ |
| [PHASE 5](#phase-5--implement-custom-header-component-recommended) | Implement custom-header Component (Recommended) | ☐ |
| [PHASE 6](#phase-6--implement-2-animations-animationcontroller--uts-req-9) | Implement 2 Animations (AnimationController — UTS Req #9) | ☐ |
| [PHASE 7](#phase-7--implement-dashboard-page--uts-req-2) | Implement Dashboard Page (UTS Req #2) | ☐ |
| [PHASE 8](#phase-8--implement-transaction-history-page--uts-req-11) | Implement Transaction History Page (UTS Req #11) | ☐ |
| [PHASE 9](#phase-9--implement-transaction-detail-page) | Implement Transaction Detail Page | ☐ |
| [PHASE 10](#phase-10--implement-profile-page--uts-req-1) | Implement Profile Page (UTS Req #1) | ☐ |
| [PHASE 11](#phase-11--polish-global-scss--assets--uts-req-8) | Polish Global SCSS & Assets (UTS Req #8) | ☐ |
| [PHASE 12](#phase-12--verification--git-push) | Verification & Git Push | ☐ |
| [PHASE 13](#phase-13--summary--uts-requirements) | Summary & UTS Requirements | ☐ |

---

## PHASE 1 — Prerequisite: Clone & Setup

### Step 1.1 — Clone / Pull Repository
Pastikan kamu mendapatkan versi terbaru dari GitHub yang sudah disetup oleh Person 1.

Jika belum pernah clone:
```bash
cd "C:\SEM 5\HMP"
git clone https://github.com/USERNAME_PERSON_1/SIMOBILE-UTS.git
cd SIMOBILE-UTS
```

Jika sudah punya foldernya, update dengan pull:
```bash
cd "C:\SEM 5\HMP\SIMOBILE-UTS"
git pull origin main
```

### Step 1.2 — Install Dependencies & Run
Karena folder `node_modules` tidak di-push ke GitHub, kamu WAJIB menjalankan `npm install`.

```bash
npm install
ionic serve
```

> ✅ Pastikan aplikasi bisa berjalan tanpa error dan navigasi tab & drawer berfungsi.

---

## PHASE 2 — Create Shared Components Module (Optional / Best Practice)

> 💡 **Catatan Penting — Status UTS Requirement**:
> Pada panduan soal UTS terbaru, pembuatan custom reusable component (sebelumnya **UTS Requirement #7**) **TIDAK LAGI MENJADI SYARAT WAJIB (REMOVED / OPTIONAL / NICE-TO-HAVE)**.
> Walaupun demikian, pembuatan reusable component (`product-card`, `empty-state`, `custom-header`) tetap merupakan **rekomendasi terbaik (recommended / best practice)** untuk menjaga modularitas, kebersihan kode (clean architecture), dan konsistensi UI di seluruh halaman aplikasi.

Karena kita menggunakan arsitektur NgModules, semua reusable component yang akan di-share ke banyak page (seperti kartu produk atau header) didaftarkan di dalam sebuah "Shared Module" (`ComponentsModule`).

### Step 2.1 — Buat ComponentsModule
Buka file **`src/app/components/components.module.ts`** (Buat filenya jika belum ada).

Hapus isinya (jika ada), lalu ganti dengan:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { ProductCardComponent } from './product-card/product-card.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    EmptyStateComponent,
    CustomHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ProductCardComponent,
    EmptyStateComponent,
    CustomHeaderComponent
  ]
})
export class ComponentsModule { }
```

> 💡 **Catatan Integrasi (Recommended / Best Practice)**: Agar page lain (seperti Dashboard atau Product List) bisa memanfaatkan reusable component ini, **Person yang mengerjakan page tersebut direkomendasikan mengimport `ComponentsModule`** di dalam `.module.ts` page masing-masing.

---

## PHASE 3 — Implement product-card Component (Recommended)

> 💡 **Best Practice UI Component**: Komponen kartu produk reusable untuk standarisasi tampilan kartu katalog di berbagai halaman (seperti Product List dan Dashboard).

### Step 3.1 — Edit product-card.component.ts
Buka file **`src/app/components/product-card/product-card.component.ts`**.

```typescript
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

  constructor() {}

  get defaultImage(): string {
    return this.product.imageUrl && this.product.imageUrl.trim() !== '' 
      ? this.product.imageUrl 
      : 'assets/images/default-product.png';
  }

  onAddToCart(event: Event) {
    event.stopPropagation(); // Mencegah klik kartu saat tombol diklik
    this.addToCartEvent.emit(this.product);
  }

  onViewDetail() {
    this.viewDetailEvent.emit(this.product.id);
  }
}
```

### Step 3.2 — Edit product-card.component.html
Buka file **`src/app/components/product-card/product-card.component.html`**.

```html
<ion-card class="product-card" (click)="onViewDetail()">
  <div class="image-container">
    <ion-img [src]="defaultImage" alt="{{ product.name }}"></ion-img>
  </div>
  
  <ion-card-header>
    <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
    <ion-card-title>{{ product.name }}</ion-card-title>
  </ion-card-header>

  <ion-card-content>
    <div class="price-stock">
      <span class="price">Rp {{ product.sellingPrice | number:'1.0-0' }}</span>
      <span class="stock" [ngStyle]="{'color': product.stock > 0 ? 'var(--ion-color-success)' : 'var(--ion-color-danger)'}">
        Sisa: {{ product.stock }}
      </span>
    </div>

    <ion-button 
      expand="block" 
      color="primary" 
      class="add-to-cart-btn"
      [disabled]="product.stock === 0"
      (click)="onAddToCart($event)">
      <ion-icon name="cart-outline" slot="start"></ion-icon>
      {{ product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang' }}
    </ion-button>
  </ion-card-content>
</ion-card>
```

### Step 3.3 — Edit product-card.component.scss
Buka file **`src/app/components/product-card/product-card.component.scss`**.

```scss
.product-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }

  .image-container {
    height: 180px;
    width: 100%;
    background-color: var(--ion-color-light);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    ion-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ion-card-header {
    padding-bottom: 8px;
    
    ion-card-title {
      font-size: 1.1rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ion-card-subtitle {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--ion-color-medium);
    }
  }

  ion-card-content {
    .price-stock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .price {
        font-size: 1.1rem;
        font-weight: bold;
        color: var(--ion-color-success);
      }

      .stock {
        font-size: 0.85rem;
        font-weight: 500;
      }
    }

    .add-to-cart-btn {
      margin-top: 10px;
      --border-radius: 8px;
    }
  }
}
```

---

## PHASE 4 — Implement empty-state Component (Recommended)

> 💡 **Best Practice UI Component**: Komponen ini berguna untuk menampilkan pesan visual informatif saat data kosong (misalnya transaksi atau keranjang belanja kosong, riwayat transaksi belum ada, atau hasil pencarian produk tidak ditemukan).

### Step 4.1 — Edit empty-state.component.ts
Buka **`src/app/components/empty-state/empty-state.component.ts`**.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon: string = 'cart-outline';
  @Input() title: string = 'Tidak ada data';
  @Input() message: string = 'Belum ada data untuk ditampilkan';

  constructor() {}
}
```

### Step 4.2 — Edit empty-state.component.html
Buka **`src/app/components/empty-state/empty-state.component.html`**.

```html
<div class="empty-state-container">
  <ion-icon [name]="icon" class="empty-icon" color="medium"></ion-icon>
  <h2 class="empty-title">{{ title }}</h2>
  <p class="empty-message">{{ message }}</p>
</div>
```

### Step 4.3 — Edit empty-state.component.scss
Buka **`src/app/components/empty-state/empty-state.component.scss`**.

```scss
.empty-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px;
  text-align: center;
  padding: 20px;

  .empty-icon {
    font-size: 5rem;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: var(--ion-color-dark);
  }

  .empty-message {
    font-size: 0.9rem;
    color: var(--ion-color-medium);
    margin: 0;
    max-width: 80%;
  }
}
```

---

## PHASE 5 — Implement custom-header Component (Recommended)

> 💡 **Best Practice UI Component**: Komponen header reusable dengan dukungan konsisten untuk tombol drawer menu dan tombol back navigasi di seluruh halaman.

### Step 5.1 — Edit custom-header.component.ts
Buka **`src/app/components/custom-header/custom-header.component.ts`**.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  standalone: false,
})
export class CustomHeaderComponent {
  @Input() title: string = 'SIMOBILE';
  @Input() showMenuButton: boolean = true;
  @Input() showBackButton: boolean = false;
  @Input() backHref: string = '/tabs/dashboard';

  constructor() {}
}
```

### Step 5.2 — Edit custom-header.component.html
Buka **`src/app/components/custom-header/custom-header.component.html`**.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-menu-button *ngIf="showMenuButton"></ion-menu-button>
      <ion-back-button *ngIf="showBackButton" [defaultHref]="backHref"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ title }}</ion-title>
  </ion-toolbar>
</ion-header>
```

### Step 5.3 — Edit custom-header.component.scss
Buka **`src/app/components/custom-header/custom-header.component.scss`**.

```scss
ion-toolbar {
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

---

## PHASE 6 — Implement 2 Animations (AnimationController) — UTS Requirement #9

> 🎯 **UTS Requirement #9 (Animasi — sebelumnya #10)**: Memenuhi syarat minimal 2 animasi interaktif di dalam aplikasi menggunakan `AnimationController` bawaan `@ionic/angular`.

### Step 6.1 — Buat File Animasi Pertama (Fade In)
Buat folder baru **`src/app/animations`** (jika belum ada).
Di dalam folder tersebut, buat file **`product-fade-in.animation.ts`**.

```typescript
import { AnimationController } from '@ionic/angular/lazy';

export const fadeInProductsAnimation = (animationCtrl: AnimationController) => {
  const cards = document.querySelectorAll('.product-card');
  
  if (!cards || cards.length === 0) return;

  cards.forEach((card, index) => {
    const anim = animationCtrl.create()
      .addElement(card as HTMLElement)
      .duration(500)
      .delay(index * 100) // Stagger effect
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(20px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0)' }
      ]);
    
    anim.play();
  });
};
```

> **Instruksi untuk Person 2 (Pengguna Komponen)**: 
> Untuk menggunakan animasi ini di `product-list.page.ts`, Person 2 harus menambahkan kode berikut:
> ```typescript
> // In product-list.page.ts — add this import and injection
> import { AnimationController } from '@ionic/angular/lazy';
> import { fadeInProductsAnimation } from '../../animations/product-fade-in.animation';
> 
> constructor(
>   private productService: ProductService,
>   private cartService: CartService,
>   private router: Router,
>   private animationCtrl: AnimationController 
> ) {}
> 
> ionViewDidEnter() {
>   this.fadeInProducts();
> }
> 
> fadeInProducts() {
>   const cards = document.querySelectorAll('.product-card');
>   cards.forEach((card, index) => {
>     const anim = this.animationCtrl.create()
>       .addElement(card as HTMLElement)
>       .duration(500)
>       .delay(index * 100)
>       .iterations(1)
>       .keyframes([
>         { offset: 0, opacity: '0', transform: 'translateY(20px)' },
>         { offset: 1, opacity: '1', transform: 'translateY(0)' }
>       ]);
>     anim.play();
>   });
> }
> ```

### Step 6.2 — Buat File Animasi Kedua (Bounce)
Di dalam folder `src/app/animations`, buat file **`add-to-cart-bounce.animation.ts`**.

```typescript
import { AnimationController } from '@ionic/angular/lazy';

export const addToCartBounceAnimation = (animationCtrl: AnimationController, element: HTMLElement) => {
  const anim = animationCtrl.create()
    .addElement(element)
    .duration(400)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.4, transform: 'scale(1.2)' },
      { offset: 0.7, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ]);
  
  anim.play();
};
```

> **Instruksi untuk Person 2 / Person 3 (Transaksi & Keranjang — UTS Req #10)**: Panggil animasi ini saat tombol add to cart diklik, dengan passing elemen targetnya (bisa pakai `@ViewChild` atau `$event.target`).
> Contoh di dalam page component:
> ```typescript
> onAddToCart(product: Product, event: any) {
>   // Logika cart
>   this.cartService.addToCart(product);
>   
>   // Animasi bounce
>   const buttonElement = event.target.closest('ion-button');
>   if (buttonElement) {
>     addToCartBounceAnimation(this.animationCtrl, buttonElement);
>   }
> }
> ```

---

## PHASE 7 — Implement Dashboard Page — UTS Requirement #2

> 🎯 **UTS Requirement #2 (Dashboard)**: Halaman awal (Tab 1) yang menampilkan rekapitulasi penjualan dan produk terlaris.

### Step 7.1 — Edit dashboard.module.ts
Buka **`src/app/pages/dashboard/dashboard.module.ts`** (buat jika belum ada).

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
```

### Step 7.2 — Edit dashboard.page.ts
Buka **`src/app/pages/dashboard/dashboard.page.ts`**.

```typescript
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  totalProducts = 0;
  todaySales = 0;
  todayTransactionCount = 0;
  bestSelling: { productName: string; quantity: number } | null = null;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ionViewWillEnter() {
    this.totalProducts = this.productService.getProducts().length;
    const todayTransactions = this.transactionService.getTodayTransactions();
    this.todayTransactionCount = todayTransactions.length;
    this.todaySales = todayTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    this.bestSelling = this.transactionService.getBestSellingProduct();
  }
}
```

### Step 7.3 — Edit dashboard.page.html
Buka **`src/app/pages/dashboard/dashboard.page.html`**.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>Dashboard</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-card class="welcome-card">
    <ion-card-header>
      <ion-card-title>Selamat Datang!</ion-card-title>
      <ion-card-subtitle>Toko Makmur Jaya</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <p>Kelola toko Anda dengan mudah menggunakan SIMOBILE.</p>
    </ion-card-content>
  </ion-card>

  <ion-grid>
    <ion-row>
      <ion-col size="6">
        <ion-card class="stat-card">
          <ion-card-content class="ion-text-center">
            <ion-icon name="cube-outline" color="primary" style="font-size: 2rem;"></ion-icon>
            <h2>{{ totalProducts }}</h2>
            <p>Total Produk</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card class="stat-card">
          <ion-card-content class="ion-text-center">
            <ion-icon name="receipt-outline" color="secondary" style="font-size: 2rem;"></ion-icon>
            <h2>{{ todayTransactionCount }}</h2>
            <p>Transaksi Hari Ini</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="6">
        <ion-card class="stat-card">
          <ion-card-content class="ion-text-center">
            <ion-icon name="cash-outline" color="success" style="font-size: 2rem;"></ion-icon>
            <h2>Rp {{ todaySales | number }}</h2>
            <p>Total Penjualan</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="6">
        <ion-card class="stat-card">
          <ion-card-content class="ion-text-center">
            <ion-icon name="trophy-outline" color="warning" style="font-size: 2rem;"></ion-icon>
            <h2>{{ bestSelling?.productName || '-' }}</h2>
            <p>Produk Terlaris ({{ bestSelling?.quantity || 0 }} terjual)</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```

### Step 7.4 — Edit dashboard.page.scss
Buka **`src/app/pages/dashboard/dashboard.page.scss`**.

```scss
.welcome-card {
  --background: var(--ion-color-primary);
  --color: white;
  ion-card-header { --color: white; }
  ion-card-subtitle { --color: rgba(255,255,255,0.8); }
}
.stat-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  h2 { font-size: 1.4rem; font-weight: 700; margin: 8px 0 4px; }
  p { font-size: 0.8rem; color: var(--ion-color-medium); }
}
```

---

## PHASE 8 — Implement Transaction History Page — UTS Requirement #11

> 🎯 **UTS Requirement #11 (Riwayat Transaksi)**: Menampilkan daftar transaksi yang sudah dilakukan (Tab 3).

### Step 8.1 — Edit transaction-history.module.ts
Buka **`src/app/pages/transaction-history/transaction-history.module.ts`**.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { TransactionHistoryPageRoutingModule } from './transaction-history-routing.module';
import { TransactionHistoryPage } from './transaction-history.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TransactionHistoryPageRoutingModule, ComponentsModule],
  declarations: [TransactionHistoryPage]
})
export class TransactionHistoryPageModule {}
```

### Step 8.2 — Edit transaction-history.page.ts
Buka **`src/app/pages/transaction-history/transaction-history.page.ts`**.

```typescript
import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ionViewWillEnter() {
    this.transactions = this.transactionService.getAllTransactions();
  }
}
```

### Step 8.3 — Edit transaction-history.page.html
Buka **`src/app/pages/transaction-history/transaction-history.page.html`**.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>Riwayat Transaksi</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list *ngIf="transactions.length > 0; else emptyState">
    <ion-item *ngFor="let t of transactions" [routerLink]="['/transaction-detail', t.id]" detail>
      <ion-icon name="receipt-outline" slot="start" color="primary"></ion-icon>
      <ion-label>
        <h2>Transaksi #{{ t.id }}</h2>
        <p>{{ t.date | date:'dd MMM yyyy, HH:mm' }}</p>
      </ion-label>
      <ion-note slot="end">
        <p style="font-weight: bold;">Rp {{ t.totalAmount | number }}</p>
        <p>{{ t.items.length }} item</p>
      </ion-note>
    </ion-item>
  </ion-list>

  <ng-template #emptyState>
    <app-empty-state
      icon="receipt-outline"
      title="Belum Ada Transaksi"
      message="Transaksi yang sudah dikonfirmasi akan muncul di sini."
    ></app-empty-state>
  </ng-template>
</ion-content>
```

---

## PHASE 9 — Implement Transaction Detail Page

> 🎯 **Detail Transaksi**: Halaman untuk melihat detail item dari riwayat transaksi.

### Step 9.1 — Edit transaction-detail.module.ts
Buka **`src/app/pages/transaction-detail/transaction-detail.module.ts`**.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';
import { TransactionDetailPage } from './transaction-detail.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TransactionDetailPageRoutingModule],
  declarations: [TransactionDetailPage]
})
export class TransactionDetailPageModule {}
```

### Step 9.2 — Edit transaction-detail.page.ts
Buka **`src/app/pages/transaction-detail/transaction-detail.page.ts`**.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: false,
})
export class TransactionDetailPage implements OnInit {
  transaction: Transaction | undefined;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.transaction = this.transactionService.getTransactionById(+params['id']);
      }
    });
  }
}
```

### Step 9.3 — Edit transaction-detail.page.html
Buka **`src/app/pages/transaction-detail/transaction-detail.page.html`**.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/tabs/transactions"></ion-back-button>
    </ion-buttons>
    <ion-title>Detail Transaksi</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding" *ngIf="transaction">
  <ion-card>
    <ion-card-header>
      <ion-card-title>Transaksi #{{ transaction.id }}</ion-card-title>
      <ion-card-subtitle>{{ transaction.date | date:'dd MMMM yyyy, HH:mm' }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>

  <ion-list>
    <ion-list-header>
      <ion-label>Daftar Item</ion-label>
    </ion-list-header>
    <ion-item *ngFor="let item of transaction.items">
      <ion-label>
        <h3>{{ item.productName }}</h3>
        <p>{{ item.quantity }} x Rp {{ item.price | number }}</p>
      </ion-label>
      <ion-note slot="end">
        Rp {{ item.quantity * item.price | number }}
      </ion-note>
    </ion-item>
  </ion-list>

  <ion-card class="total-card">
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col><strong>Total Pembayaran</strong></ion-col>
          <ion-col class="ion-text-end"><strong>Rp {{ transaction.totalAmount | number }}</strong></ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</ion-content>
```

---

## PHASE 10 — Implement Profile Page — UTS Requirement #1

> 🎯 **UTS Requirement #1 (Navigasi Tab)**: Halaman Profile merupakan tab ke-4 dari struktur navigasi utama aplikasi SIMOBILE (**Tab 1: Dashboard, Tab 2: Produk, Tab 3: Transaksi, Tab 4: Profil**).  
> *(Catatan: Tab 3 adalah **Transaksi**, bukan Keranjang).*

Kita akan membuat halaman profil sederhana dengan desain yang elegan.

### Step 10.1 — Edit profile.module.ts
Buka **`src/app/pages/profile/profile.module.ts`**. Pastikan default imports ada, tidak perlu perubahan khusus jika menggunakan bawaan Ionic.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
```

### Step 10.2 — Edit profile.page.ts
Buka **`src/app/pages/profile/profile.page.ts`**.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  
  owner = {
    name: 'Budi Santoso',
    role: 'Pemilik Toko',
    phone: '0812-3456-7890',
    email: 'budi.santoso@tokomakmur.com',
    address: 'Jl. Merdeka No.45, Jakarta',
    joinDate: 'Januari 2023',
    photoUrl: 'assets/images/profile-pic.png'
  };

  constructor() {}

  ngOnInit() {
  }
}
```

### Step 10.3 — Edit profile.page.html
Buka **`src/app/pages/profile/profile.page.html`**.

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>Profil</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding profile-content">
  <div class="profile-header">
    <ion-avatar class="profile-avatar">
      <ion-img [src]="owner.photoUrl" alt="Profile Picture"></ion-img>
    </ion-avatar>
    <h2 class="profile-name">{{ owner.name }}</h2>
    <p class="profile-role">{{ owner.role }}</p>
  </div>

  <ion-card class="info-card">
    <ion-list lines="full">
      <ion-item>
        <ion-icon name="call-outline" slot="start" color="primary"></ion-icon>
        <ion-label>
          <h3>Nomor Telepon</h3>
          <p>{{ owner.phone }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-icon name="mail-outline" slot="start" color="primary"></ion-icon>
        <ion-label>
          <h3>Email</h3>
          <p>{{ owner.email }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-icon name="location-outline" slot="start" color="primary"></ion-icon>
        <ion-label>
          <h3>Alamat Toko</h3>
          <p class="ion-text-wrap">{{ owner.address }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-icon name="calendar-outline" slot="start" color="primary"></ion-icon>
        <ion-label>
          <h3>Bergabung Sejak</h3>
          <p>{{ owner.joinDate }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-card>

  <ion-button expand="block" color="danger" class="logout-btn" fill="outline">
    <ion-icon name="log-out-outline" slot="start"></ion-icon>
    Keluar / Log Out
  </ion-button>
</ion-content>
```

### Step 10.4 — Edit profile.page.scss
Buka **`src/app/pages/profile/profile.page.scss`**.

```scss
.profile-content {
  --background: var(--ion-color-light);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 10px 20px;
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary));
  border-radius: 0 0 20px 20px;
  margin: -16px -16px 20px -16px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .profile-avatar {
    width: 100px;
    height: 100px;
    border: 4px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 12px;
    background: #fff;
  }

  .profile-name {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .profile-role {
    margin: 5px 0 0 0;
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.info-card {
  border-radius: 12px;
  margin: 0 0 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  ion-item {
    --padding-start: 16px;
    --inner-padding-end: 16px;
    
    ion-label h3 {
      font-size: 0.85rem;
      color: var(--ion-color-medium);
      margin-bottom: 4px;
    }
    
    ion-label p {
      font-size: 1.05rem;
      color: var(--ion-color-dark);
      font-weight: 500;
    }
  }
}

.logout-btn {
  margin-top: 30px;
  --border-radius: 8px;
  --border-width: 2px;
  font-weight: 600;
}
```

---

## PHASE 11 — Polish Global SCSS & Assets — UTS Requirement #8

> 🎯 **UTS Requirement #8 (Custom Theme & Dark Mode — sebelumnya #9)**: Mendukung implementasi tema toko dan dark mode (bersama konfigurasi Person 1 di `variables.scss`) melalui utility classes SCSS dan penyesuaian styling global.

### Step 11.1 — Edit global.scss
Buka **`src/global.scss`**. Tambahkan utility classes yang bisa digunakan oleh seluruh tim.

```scss
/* Core CSS required for Ionic components to work properly */
@import "@ionic/angular/css/core.css";
/* Basic CSS for apps built with Ionic */
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
/* Optional CSS utils that can be commented out */
@import "@ionic/angular/css/padding.css";
@import "@ionic/angular/css/float-elements.css";
@import "@ionic/angular/css/text-alignment.css";
@import "@ionic/angular/css/text-transformation.css";
@import "@ionic/angular/css/flex-utils.css";
@import "@ionic/angular/css/display.css";

/* ═══════════════════════════════════════
   CUSTOM GLOBAL STYLES (PERSON 4)
═══════════════════════════════════════ */

/* Utilities */
.text-bold { font-weight: bold; }
.text-semibold { font-weight: 600; }
.text-medium { font-weight: 500; }

.text-primary { color: var(--ion-color-primary); }
.text-danger { color: var(--ion-color-danger); }
.text-success { color: var(--ion-color-success); }
.text-muted { color: var(--ion-color-medium); }

.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }

/* Custom Card Global Styling */
ion-card.custom-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background: var(--ion-item-background, var(--ion-background-color, #fff));
}

/* Custom Button Styling */
ion-button.rounded-btn {
  --border-radius: 50px;
}

/* Page Background Fix for Dark Mode */
ion-content {
  --background: var(--ion-background-color);
}
```

### Step 11.2 — Siapkan Placeholder Assets
Buat file gambar sederhana (bisa download dari internet atau buat di Figma) untuk:
1. `src/assets/images/default-product.png` (Gambar kotak kosong abu-abu)
2. `src/assets/images/profile-pic.png` (Ikon orang)
3. `src/assets/logo/toko-makmur-jaya.png` (Logo sederhana toko)

Jika belum ada gambar, komponen akan otomatis gagal muat dengan elegan, tetapi sebaiknya siapkan gambar aslinya.

---

## PHASE 12 — Verification & Git Push

### Checklist Verifikasi
- [ ] Folder `src/app/components` berisi `product-card`, `empty-state`, `custom-header` (Reusable Components — Optional / Best Practice)
- [ ] `ComponentsModule` sudah mengekspor semua komponen tersebut
- [ ] Folder `src/app/animations` berisi 2 file animasi via `AnimationController` (UTS Req #9)
- [ ] Halaman Profil terlihat rapi dengan desain avatar dan gradient header (UTS Req #1 — Tab 4)
- [ ] Global SCSS utilities dan styling Dark Mode berfungsi optimal (UTS Req #8)
- [ ] Tidak ada error di terminal saat menjalankan `ionic serve`

### Git Commit & Push
Buka terminal VS Code:

```bash
git add .
git commit -m "feat(ui): add reusable components, profile page, animations, and global scss polish"
git push origin main
```

---

## PHASE 13 — Summary & UTS Requirements

🎉 **Kerja bagus!** Person 4 telah berhasil menyelesaikan implementasi UI/UX, Theme, Animation, Dashboard, Riwayat Transaksi, dan Profile:
1. Membuat `product-card`, `empty-state`, dan `custom-header` (Reusable Component — Recommended).
2. Menyiapkan 2 animasi kustom berbasis `AnimationController` (UTS Req #9).
3. Membangun halaman Dashboard dengan statistik (UTS Req #2).
4. Membangun halaman Riwayat Transaksi dan Detail (UTS Req #11).
5. Membangun halaman Profile lengkap (UTS Req #1).
6. Mempercantik Global SCSS dan mendukung Dark Mode (UTS Req #8).

---

### 📋 Pemetaan UTS Requirements (11 To-Do Terbaru)

Berikut adalah status pemetaan seluruh 11 persyaratan UTS terbaru setelah penyesuaian soal:

| No. Req Baru | Nama Requirement | PIC Utama | Status di Soal Baru | Hubungan dengan Person 4 |
|:---:|---|:---:|:---:|---|
| **#1** | **Struktur Navigasi** (Tabs + Drawer) | Person 1 & 4 | 🔴 Mandatory | Person 4 menyelesaikan **Tab 4 (Profil)**. *(Catatan: Tab 3 adalah **Transaksi**).* |
| **#2** | **Dashboard** | Person 4 | 🔴 Mandatory | Person 4 mengimplementasikan halaman Dashboard dengan statistik penjualan (Tab 1). |
| **#3** | **Pencarian Real-Time** | Person 2 | 🔴 Mandatory | Filter produk via `[(ngModel)]` |
| **#4** | **Detail Produk via Route Parameter** | Person 2 | 🔴 Mandatory | Navigasi parameter route `:id` |
| **#5** | **Property & Event Binding** | Person 2 & 4 | 🔴 Mandatory | Terpasang pada `ProductCardComponent` (`[src]`, `[disabled]`, `(click)`) |
| **#6** | **Reactive Form + Validasi** | Person 2 | 🔴 Mandatory | Form tambah & edit produk |
| **#7** | **Angular Services (3+ Services)** | Person 1 | 🔴 Mandatory | *Sebelumnya Req #8* — Product, Cart, Transaction Services |
| **#8** | **Custom Theme & Dark Mode** | Person 1 & 4 | 🟡 Mandatory | *Sebelumnya Req #9* — Person 4 memoles `global.scss`, card styles, dan dark mode compatibility |
| **#9** | **Animasi (min. 2 Animasi)** | Person 4 | 🟡 Mandatory | *Sebelumnya Req #10* — 2 animasi (`fadeInProductsAnimation` & `addToCartBounceAnimation`) |
| **#10** | **Keranjang & Checkout** | Person 3 | 🔴 Mandatory | *Sebelumnya Req #11* — Keranjang belanja & konfirmasi pesanan |
| **#11** | **Riwayat Transaksi** | Person 4 | 🔴 Mandatory | Person 4 menyelesaikan daftar dan detail riwayat transaksi (Tab 3). |
| *Eks #7* | **Reusable Components** | Person 4 | 🟢 **REMOVED (Optional / Best Practice)** | Dihapus dari syarat wajib UTS baru; dibuat sebagai **best practice** (`ComponentsModule`) |

> ℹ️ **Ringkasan Perubahan Soal UTS**:
> 1. **Eks Requirement #7 (Reusable Component)**: Dihapus dari daftar to-do wajib UTS. Kini berstatus **optional / nice-to-have**, namun tetap sangat dianjurkan sebagai **recommended / best practice**.
> 2. **Pergeseran Nomor Requirement**:
>    - Service (sebelumnya #8) ➔ **Kini #7**
>    - Theme & Dark Mode (sebelumnya #9) ➔ **Kini #8**
>    - Animasi (sebelumnya #10) ➔ **Kini #9**
>    - Keranjang & Checkout (sebelumnya #11) ➔ **Kini #10**
>    - Riwayat Transaksi (sebelumnya #12) ➔ **Kini #11**
> 3. **Struktur Tab Navigasi**: Tab 1 = Dashboard, Tab 2 = Produk, Tab 3 = **Transaksi**, Tab 4 = Profil.

---

### 🤝 Koordinasi & Petunjuk untuk Anggota Tim

Silakan koordinasikan dengan anggota tim lainnya:
1. **Person 2 (Product & Search)**:
   - Disarankan mengimpor `ComponentsModule` di `product-list.module.ts` jika ingin memakai tag `<app-product-card>` atau `<app-empty-state>` (best practice).
   - Dapat memanfaatkan fungsi `fadeInProductsAnimation(this.animationCtrl)` di `product-list.page.ts` saat `ionViewDidEnter()`.
2. **Person 3 (Cart & Transaction)**:
   - Disarankan mengimpor `ComponentsModule` di module halaman transaksi/cart untuk memakai `<app-empty-state>`.
   - Dapat memanggil `addToCartBounceAnimation(this.animationCtrl, buttonElement)` untuk interaksi add to cart / transaksi (UTS Req #10).
3. **Person 1 (Architect & Navigation Lead)**:
   - Halaman Profile (`/tabs/profile`) sudah lengkap dan siap diintegrasikan penuh ke Tabs Navigasi (Tab 4) dan Drawer Menu.
