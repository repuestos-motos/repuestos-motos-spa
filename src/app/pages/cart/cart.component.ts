import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItem } from '../../interface/cart-item';
import { Order } from '../../interface/order';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { Client } from '../../interface/client';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public isSeller: boolean = false;
  public selectedClient: Client;
  public cartItems: CartItem[] = [];
  public totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private authService: AuthenticationService,
    private preloader: PreloaderService,
    private toastService: ToastService
  ) {
    this.cartItems = this.cartService.getCartItems();
    this.isSeller = this.authService.isSeller();
    const selectedClient = this.authService.getSelectedClient();
    if (selectedClient) {
      this.selectedClient = selectedClient;
    }
    this.calcTotalAmount();
  }

  private calcTotalAmount() {
    this.totalAmount = this.cartItems.reduce(
      (t,p) => {
        return t + (p.unitPrice * p.quantity);
      },
      0
    );
  }

  confirmOrder() {
    const userInfo = this.authService.getUserInfo();
    const order: Order = {
      clientId: userInfo.id,
      orderItems: this.cartItems
    }

    if (this.isSeller) {
      order.clientId = this.selectedClient.clientId;
      order.sellerId = userInfo.id;
    }

    this.preloader.block();

    this.ordersService.confirmOrder(order).subscribe({
      next: (resp: any) => {
        this.clearCart();
        this.preloader.unblock();
        this.toastService.add('Pedio confirmado', 'Su pedido ha sido confirmado correctamente.');
      },
      error: (resp: any) => {
        this.preloader.unblock();
        console.info('Error al crear pedido');
        console.info(resp);
        this.toastService.add('Pedido', 'Se produjo un error al confirmar su pedido, por favor vuelva a intentarlo luego');
      }
    });

  }

  cancelOrder() {
    this.clearCart();
  }
  
  removeItem(item: CartItem) {
    this.cartItems = this.cartService.removeItem(item);
    this.calcTotalAmount();
  }
  
  clearCart() {
    this.cartService.clearCartItems();
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = 0;
  }

}
