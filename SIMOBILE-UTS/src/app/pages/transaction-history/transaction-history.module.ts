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
