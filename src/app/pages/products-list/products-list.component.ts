import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { ProductsService } from '../../services/products.service';
import { combineLatest } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productList: Product[]  = [];
  public productsCategories: Category[] = [];
  public selectedCategory: Category | null = null;
  private userInfo: User;

  constructor(
    private productsService: ProductsService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnInit(): void {
    combineLatest([
      this.productsService.getCategories(),
      this.productsService.getProducts(this.userInfo.id)
    ]).subscribe(
      ([c, p]) => {
        this.productsCategories = c;
        this.productList = p;
        console.log(p)
      }
    );
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
