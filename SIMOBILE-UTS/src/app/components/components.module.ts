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
<<<<<<< HEAD
export class ComponentsModule { }
=======
export class ComponentsModule { }
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
