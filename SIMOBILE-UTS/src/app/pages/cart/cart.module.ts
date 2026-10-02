import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
// Import jika ada ComponentsModule: import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
    // ComponentsModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}