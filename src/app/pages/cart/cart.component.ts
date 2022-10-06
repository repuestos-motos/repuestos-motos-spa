import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItem } from '../../interface/cart-item';
import { Order } from '../../interface/order';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public cartItems: CartItem[] = [];
  public totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.cartItems = this.cartService.getCartItems();
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
    // TODO: Check if the user is a seller
    this.ordersService.confirmOrder(order).subscribe({
      next: (resp: any) => {
        this.clearCart();
        this.toastService.add('Pedio confirmado', 'Su pedido ha sido confirmado correctamente.');
      },
      error: (resp: any) => {
        console.info('Error al crear pedido');
        console.info(resp);
        this.toastService.add('Pedido', 'Se produjo un error al confirmar su pedido, por favor vuelva a intentarlo luego');
      }
    });
  }
  
  removeItem(item: CartItem) {
    this.cartItems = this.cartService.removeItem(item);
  }
  
  clearCart() {
    this.cartService.clearCartItems();
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = 0;
  }

}
