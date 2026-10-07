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

  constructor(private transactionService: TransactionService) { }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.transactions = this.transactionService.getAllTransactions();
  }

  trackByTxId(index: number, tx: Transaction) {
    return tx.id;
  }
}