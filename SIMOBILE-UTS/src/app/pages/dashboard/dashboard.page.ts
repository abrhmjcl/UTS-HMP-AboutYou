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
  totalProducts: number = 0;
  todaySales: number = 0;
  todayTransactionCount: number = 0;
  bestSellingProduct: { productName: string; quantity: number } = { productName: '-', quantity: 0 };

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.totalProducts = this.productService.getTotalProductCount();
    this.todaySales = this.transactionService.getTodayTotalSales();
    this.todayTransactionCount = this.transactionService.getTodayTransactionCount();
    this.bestSellingProduct = this.transactionService.getBestSellingProductToday();
  }
}