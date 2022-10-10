import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, Subject } from 'rxjs';
import { Category } from '../interface/category';
import { Product } from '../interface/product';
import { CartService } from './cart.service';
import { Client } from '../interface/client';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productList: Product[];
  private productListObs: Subject<Product[]>;

  constructor(
    private api: ApiService,
    private cartService: CartService
  ) {
    this.productListObs = new Subject<Product[]>();
    this.productListObs.subscribe({
      next: r => { this.productList = r }
    });
  }

  public getCategories(): Observable<Category[]> {
    return this.api.get('products/categories').pipe(
      map(
        (r: any) => {
          return r.data as Category[];
        }
      )
    );
  }

  public getClientList(): Observable<Client[]> {
    return this.api.get('products/client-list').pipe(
      map(
        (r: any) => {
          return r.data as Client[];
        }
      )
    );
  }

  public getProducts(userId: number): Observable<Product[]> {
    const cartItems = this.cartService.getCartItems();
    this.api.get('products/list', {userId}).subscribe(
     {
      next: (r: any) => {
        r.data = (r.data as Product[]).map(p => {
          p.quantityAdded = 0;
          cartItems.forEach(item => {
            if (item.productId === p.productId) {
              p.quantityAdded = item.quantity;
            }
          });
          return p;
        });
        this.productListObs.next(r.data);
      },
      error: e => {
        this.productListObs.error(e);
      }
     } 
    );
    return this.productListObs;
  }
}
