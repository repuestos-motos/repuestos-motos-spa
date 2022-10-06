import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../interface/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  public order: Order;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.route.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.ordersService.getOrder(params.id).subscribe({
            next: (resp: any) => {
              this.order = resp.data;
              console.log(this.order);
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
