import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular/lazy';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionService } from './services/transaction.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TransactionService,
    CartService,
    ProductService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}