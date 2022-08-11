import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos/:filtros',
    component: ProductsListComponent
  },
  {
    path: 'producto/:id',
    component: ProductDetailComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  },
  {
    path: 'carro',
    component: CartComponent
  },
  {
    path: 'pedido-confirmacion',
    component: ConfirmationComponent
  },
  {
    path: 'pedidos',
    component: OrdersListComponent
  },
  {
    path: 'pedido/:id',
    component: OrderDetailComponent
  },
  {
    path: '',
    component: ProductsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
