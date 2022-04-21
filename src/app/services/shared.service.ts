import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartIncrement;
  public cartIncrementObserve: Observable<{
    count: number
  }>;

  public cartItems: Array<any> = [];
  public products = new Subject();

  constructor() {
    this.cartIncrement = new BehaviorSubject({ count: 0 });
    this.cartIncrementObserve = this.cartIncrement.asObservable();
  }
  @Output() event = new EventEmitter();

  getProducts(): Observable<any> {
    console.log('this.cartItems :', this.cartItems);
    return this.products.asObservable();
  }

  setProducts(products) {
    this.cartItems.push(...products);
    this.products.next(products);
  }

  // Add single product to the cart
  addProductToCart(product) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);
  }

  // Remove single product from the cart
  removeProductFromCart(productId) {
    this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    // Update Observable value
    this.products.next(this.cartItems);
  }

  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;

    this.cartItems.map(item => {
      total += item.price;
    });

    return total
  }

}
