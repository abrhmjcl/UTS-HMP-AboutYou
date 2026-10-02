<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
<<<<<<< HEAD
export class TransactionHistoryPage implements OnInit {
=======
export class TransactionHistoryPage {
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

<<<<<<< HEAD
  ngOnInit() {
    this.loadTransactions();
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactions = [...this.transactionService.getAllTransactions()];
  }
=======
  ionViewWillEnter() {
    this.transactions = this.transactionService.getAllTransactions();
  }
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
}
