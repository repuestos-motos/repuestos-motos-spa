import { Injectable } from '@angular/core';
import { CartItem } from '../interface/cart-item';
import { AuthenticationService } from './authentication.service';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartItemsStorageKey: string = 'cart-items';

  constructor(private authService: AuthenticationService) {
    this.getStoredCart();
    console.info('Cart loaded');
    console.info(this.cartItems);
  }

  public getCartItems(): CartItem[] {
    return this.cartItems.sort((a, b) => {
      if (a.description > b.description) {
        return 1;
      } else if (a.description < b.description) {
        return -1
      }
      return 0;
    });
  }

  clearCartItems() {
    this.cartItems = [];
    this.storeCart();
  }

  private getStoredCart() {
    const cartItemsString = localStorage.getItem(this.cartItemsStorageKey);
    if (cartItemsString) {
      const userId = this.authService.getUserInfo().id;
      const storageValue = JSON.parse(decodeURIComponent(window.atob(cartItemsString)));
      if (storageValue.userId === userId && storageValue.items) {
        this.cartItems = storageValue.items;
      }
    }
  }

  private storeCart() {
    const userId = this.authService.getUserInfo().id;
    const value = window.btoa(
      encodeURIComponent(
        JSON.stringify(
          {userId: userId, items: this.cartItems}
        )
      )
    );
    localStorage.setItem(this.cartItemsStorageKey, value)
  }

  addToCart(product: Product, quantity: number) {
    let item = this.cartItems.find(p => p.productId === product.productId);
    if (item) {
      // Item exist -> modify the current reference
      item.quantity += quantity;
      item.description = product.title;
      item.unitPrice = product.price;
      console.info('Current item in cart modified');
      console.info(this.cartItems);
    } else {
      item = {
        productId: product.productId,
        description: product.title,
        unitPrice: product.price, 
        quantity
      };
      this.cartItems.push(item);
      console.info('New item added to cart');
      console.info(this.cartItems);
    }
    this.storeCart();
    return item;
  }

  removeItem(item: CartItem): CartItem[] {
    const index = this.cartItems.findIndex(i => i.productId === item.productId);
    index >= 0 && this.cartItems.splice(index, 1).length && this.storeCart();
    return this.cartItems;
  }
}
