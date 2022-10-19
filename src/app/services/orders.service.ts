import { Injectable } from '@angular/core';
import { Order, OrderState } from '../interface/order';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  private states: OrderState[] = [];

  constructor(private api: ApiService) {
    this.getOrdersStatus().subscribe({
      next: (r: OrderState[]) => {
        this.states = r;
      }
    });
  }

  getOrdersStatus() {
    return this.api.get('orders/status').pipe(
      map( (r: any) => {
        this.states = r.data as OrderState[];
        return r.data;
      })
    );
  }

  confirmOrder(order: Order) {
    return this.api.post('orders', {order});
  }

  getOrders(clientId: number) {
    return this.api.get(`orders/list/${clientId}`).pipe(
      map((r: any) => {
        (r.data as Order[]).forEach(
          order => {
            order.state = this.states.reduce(
              (prevDesc, state) => {
                if (state.stateId === order.stateId) {
                  return state.description;
                }
                return prevDesc;
              },
              ''
            );
          });
        return r;
      })
    );
  }

  getOrder(orderId: number) {
    return this.api.get(`orders/detail/${orderId}`).pipe(
      map((r: any) => {
        const order = r.data as Order;
        order.state = this.states.reduce(
          (prevDesc, state) => {
            if (state.stateId === order.stateId) {
              return state.description;
            }
            return '';
          },
          ''
        );
        r.data = order;
        return r;
      })
    );
  }
}
