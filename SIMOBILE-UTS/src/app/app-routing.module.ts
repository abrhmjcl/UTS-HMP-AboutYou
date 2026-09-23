import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'product-form',
    loadChildren: () => import('./pages/product-form/product-form.module').then(m => m.ProductFormPageModule)
  },
  {
    path: 'product-form/:id',
    loadChildren: () => import('./pages/product-form/product-form.module').then(m => m.ProductFormPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },

  {
    path: 'transaction-history',
    loadChildren: () => import('./pages/transaction-history/transaction-history.module').then(m => m.TransactionHistoryPageModule)
  },
  {
    path: 'transaction-detail/:id',
    loadChildren: () => import('./pages/transaction-detail/transaction-detail.module').then(m => m.TransactionDetailPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'animations',
    loadChildren: () => import('./animations/animations.module').then( m => m.AnimationsPageModule)
  },
  {
    path: 'animations',
    loadChildren: () => import('./animations/animations.module').then( m => m.AnimationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
