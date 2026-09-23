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
    this.totalProducts = this.productService.getAllProducts().length;
    const todayTransactions = this.transactionService.getTodayTransactions();
    this.todayTransactionCount = todayTransactions.length;
    this.todaySales = todayTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    this.bestSelling = this.transactionService.getBestSellingProductToday();
  }
}
