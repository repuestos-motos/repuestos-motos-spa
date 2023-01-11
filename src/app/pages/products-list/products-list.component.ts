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

  private productList: Product[]  = [];
  private filteredProducts: Product[] = [];
  public productListOnView: Product[]  = [];
  public showMoreBtn: boolean = false;
  public productsCategories: Category[] = [];
  public clientList: Client[];
  public selectedClientId: number = -1;
  public selectedCategory: Category | null = null;
  private userInfo: User;
  public isSeller: boolean = false;
  public productNameSearch: string = '';
  public productNameFilter: string = '';
  private timeOut: any;
  public blockList: boolean = false;

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

  addProductsToView() {
    const fpCount = this.filteredProducts.length;
    this.productListOnView = this.filteredProducts.slice(0, this.productListOnView.length + 18);
    this.showMoreBtn = this.productListOnView.length < fpCount;
  }

  setNameFilter() {
    clearTimeout(this.timeOut);
    this.blockList = true;
    this.timeOut = setTimeout(
      () => {
        this.blockList = false;
        this.productNameFilter = this.productNameSearch;
      },
      500
    );
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
              this.filteredProducts = JSON.parse(JSON.stringify(p));
              this.addProductsToView();
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
        this.filteredProducts = JSON.parse(JSON.stringify(p));
        this.addProductsToView();
      }
    );
  }

  clientChangeSelection() {
    this.cartService.clearCartItems();
    const selectedClient = this.clientList.find(c => c.clientId == this.selectedClientId);
    this.authService.setSelectedClient(selectedClient);
    this.updateProductList();
  }

  private updateProductList() {
    this.preloaderService.block();
    this.productList = [];
    this.productsService.getProducts(this.selectedClientId).subscribe({
      next: (p: any) => {
        this.productList = p;
        this.filteredProducts = JSON.parse(JSON.stringify(p));
        this.addProductsToView();
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
    this.productListOnView = [];
    this.selectedCategory = c;
    if (this.selectedCategory) {
      this.filteredProducts = this.productList.filter(p => p.category === this.selectedCategory?.name);
    } else {
      this.filteredProducts = JSON.parse(JSON.stringify(this.productList));
    }
    this.addProductsToView();
  }

  hideProduct(product: Product) {
    if (this.selectedCategory && product.category != this.selectedCategory.name) {
      return true;
    }
    if (this.productNameFilter
        && !product.title.toUpperCase().includes(this.productNameFilter.toUpperCase())) {
      return true;
    }
    return false;
  }

}
