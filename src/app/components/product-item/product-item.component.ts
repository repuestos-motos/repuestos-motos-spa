import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  public quantityToAdd: number = 0;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.product.quantityAdded = this.cartService.checkQuantityAdded(this.product.productId);
  }

  getImageUrl(): string {
    return this.apiService.getBackendUrl() + 'products/image?productId=' + this.product.productId;
  }

  addButtonClick() {
    if ((this.quantityToAdd + 1 + this.product.quantityAdded) <= this.product.currentStock) {
      this.quantityToAdd+=1;
    }
  }

  substractButtonClick() {
    if (this.quantityToAdd > 0) {
      this.quantityToAdd-=1;
    }
  }

  addToCart() {
    const item = this.cartService.addToCart(this.product, this.quantityToAdd);
    this.product.quantityAdded = item.quantity;
    this.quantityToAdd = 0;
    this.toastService.add('Producto agregado', `Producto ${item.description} agregado a su orden.`);
  }

}
