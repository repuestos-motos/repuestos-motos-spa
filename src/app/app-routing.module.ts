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
import { AuthGuard } from './guards/auth.guard';
import { SellerLoginComponent } from './pages/seller-login/seller-login.component';

const routes: Routes = [
  {
    path: 'login-vendedor',
    component: SellerLoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos/:filtros',
    component: ProductsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    component: ProductsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'producto/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carro',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedido-confirmacion',
    component: ConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    component: OrdersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pedido/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ProductsListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
