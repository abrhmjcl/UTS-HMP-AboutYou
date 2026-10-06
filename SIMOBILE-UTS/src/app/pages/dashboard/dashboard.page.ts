import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  totalProducts = 0;
  totalSales = 0;
  todayTransactionCount = 0;
  bestSelling: { productName: string; quantity: number } | null = null;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.totalProducts = this.productService.getAllProducts().length;
    this.todayTransactionCount = this.transactionService.getTodayTransactionCount();
    
    // Perbaikan: mengambil fungsi getTotalSales()
    this.totalSales = this.transactionService.getTodayTotalSales();
    this.bestSelling = this.transactionService.getBestSellingProductToday();
  }
}
