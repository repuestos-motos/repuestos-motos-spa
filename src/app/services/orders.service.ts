import { Injectable } from '@angular/core';
import { Order } from '../interface/order';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private api: ApiService) { }

  confirmOrder(order: Order) {
    return this.api.post('orders', {order});
  }
}
