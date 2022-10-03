import { Component, Input } from '@angular/core';
import { Product } from '../../interface/product';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product: Product;
  public quantityToAdd: number = 0;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) { }

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
  }

}
