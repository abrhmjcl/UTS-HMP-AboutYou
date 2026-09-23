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