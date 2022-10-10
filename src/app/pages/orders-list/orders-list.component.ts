import { Component } from '@angular/core';
import { Order } from '../../interface/order';
import { AuthenticationService } from '../../services/authentication.service';
import { OrdersService } from '../../services/orders.service';
import { Client } from '../../interface/client';
import { ProductsService } from '../../services/products.service';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {

  public orderList: Order[] = [];
  public isSeller: boolean = false;
  public clientId: number = -1;
  public pages: number[] = [];
  public currentPage: number = 1;
  public currentPageContent: Order[];
  public itemsPerPage: number = 10;
  public clientList: Client[] = [];

  constructor(
    private auth: AuthenticationService,
    private productService: ProductsService,
    private preloader: PreloaderService,
    private ordersSerice: OrdersService
  ) {
    const userInfo = this.auth.getUserInfo();
    const selectedClient = this.auth.getSelectedClient();
    this.preloader.block();
    this.productService.getClientList().subscribe({
      next: r => {
        this.clientList = r;
        this.preloader.unblock();
      }
    });
    this.isSeller = this.auth.isSeller();
    if (!this.isSeller) {
      this.clientId = userInfo.id;
    } else if (selectedClient) {
      this.clientId = selectedClient.clientId;
    }
    if (this.clientId >= 0) {
      this.getOrders();
    }
  }

  selectedClientChange() {
    this.getOrders();
  }

  getOrders() {
    this.preloader.block();
    this.ordersSerice.getOrders(this.clientId).subscribe({
      next: (resp: any) => {
        this.orderList = resp.data as Order[];
        this.calculatePages();
        this.fillCurrentPageContent();
        this.preloader.unblock();
      },
      error: e => this.preloader.unblock()
    });
  }

  fillCurrentPageContent() {
    const minIndex = (this.currentPage * 10) - 10;
    const maxIndex = minIndex + this.itemsPerPage - 1;
    this.currentPageContent = this.orderList.filter(
      (val, index) => {
        return index <= maxIndex && index >= minIndex;
      }
    );
  }

  calculatePages() {
    this.pages = [];
    const pagesNumber = Math.ceil(this.orderList.length / this.itemsPerPage);
    let i = 0;
    while(i < pagesNumber) {
      i++;
      this.pages.push(i);
    }
  }

  isCurrentPage(page: number) {
    return page === this.currentPage;
  }

  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pages[this.pages.length - 1]) {
      this.currentPage = pageNumber;
      this.fillCurrentPageContent();
    }
  }

  lastPage() {
    return this.pages[this.pages.length - 1] === this.currentPage;
  }

  firstPage() {
    return this.currentPage === 1;
  }

}
