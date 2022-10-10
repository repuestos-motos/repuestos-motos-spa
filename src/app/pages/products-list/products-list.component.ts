import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { ProductsService } from '../../services/products.service';
import { combineLatest } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interface/user';
import { Client } from '../../interface/client';
import { CartService } from '../../services/cart.service';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productList: Product[]  = [];
  public productsCategories: Category[] = [];
  public clientList: Client[];
  public selectedClientId: number = -1;
  public selectedCategory: Category | null = null;
  private userInfo: User;
  public isSeller: boolean = false;

  constructor(
    private preloaderService: PreloaderService,
    private productsService: ProductsService,
    private authService: AuthenticationService,
    private cartService: CartService
  ) {
    this.userInfo = this.authService.getUserInfo();
    this.isSeller = this.authService.isSeller();
    const selectedClient = this.authService.getSelectedClient();
    this.selectedClientId = selectedClient ? selectedClient.clientId : -1;
  }

  ngOnInit(): void {
    if (this.userInfo.isSeller) {
      this.sellerUserInit();
    } else {
      this.clientUserInit();
    }
  }

  sellerUserInit() {
    this.preloaderService.block();
    combineLatest([
      this.productsService.getCategories(),
      this.productsService.getClientList()
    ]).subscribe(
      ([categories, clients]) => {
        this.productsCategories = categories;
        this.clientList = clients;
        if (this.selectedClientId > -1) {
          this.productsService.getProducts(this.selectedClientId).subscribe({
            next: p => {
              this.productList = p;
              this.preloaderService.unblock();
            }
          }) 
        } else {
          this.preloaderService.unblock();
        }
      }
    );
  }

  clientUserInit() {
    combineLatest([
      this.productsService.getCategories(),
      this.productsService.getProducts(this.userInfo.id)
    ]).subscribe(
      ([c, p]) => {
        this.productsCategories = c;
        this.productList = p;
      }
    );
  }

  clientChangeSelection() {
    this.cartService.clearCartItems();
    const selectedClient = this.clientList.find(c => c.clientId == this.selectedClientId);
    this.authService.setSelectedClient(selectedClient);
    this.updateProductList(this.selectedClientId);
  }

  private updateProductList(clientId: number) {
    this.preloaderService.block();
    this.productList = [];
    this.productsService.getProducts(this.selectedClientId).subscribe({
      next: (p: any) => {
        this.productList = p;
        this.preloaderService.unblock();
      },
      error: (e: any) => {
        this.preloaderService.unblock();
      }
    });
  }

  clearCategory() {
    this.selectCategory(null);
  }

  selectCategory(c: Category | null) {
    this.selectedCategory = c;
  }

  hideProduct(product: Product) {
    return this.selectedCategory && product.category != this.selectedCategory.name;
  }

}
