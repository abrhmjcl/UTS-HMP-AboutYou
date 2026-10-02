import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  ionViewWillEnter() {
    this.transactions = this.transactionService.getAllTransactions();
  }

  loadTransactions() {
    this.transactions = [...this.transactionService.getAllTransactions()];
  }
}
