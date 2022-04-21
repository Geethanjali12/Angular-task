import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

const products: Array<any> = [
  {
    'id': '1',
    'name': 'food-1',
    'price': 10,
    'images': '/assets/images/photo-1'
  },
  {
    'id': '2',
    'name': 'food-2',
    'price': 20,
    'images': '/assets/images/photo-2'
  },
  {
    'id': '3',
    'name': 'food-3',
    'price': 30,
    'images': '/assets/images/photo-3'
  },
  {
    'id': '4',
    'name': 'food-4',
    'price': 40,
    'images': '/assets/images/photo-4'
  },
  {
    'id': '5',
    'name': 'food-5',
    'price': 50,
    'images': '/assets/images/photo-5'
  },
  {
    'id': '6',
    'name': 'food-6',
    'price': 60,
    'images': '/assets/images/photo-6'
  }
]

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})


export class MenusComponent implements OnInit {

  @Input() items: any = [];
  public singleProduct;
  itemsDetails = products;
  @Output() addToCart = new EventEmitter();

  constructor(private sharedService: SharedService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  /**
   *  Add to Cart
   */
  addCart(event, id) {
    this.storageService.setItem('cart', JSON.stringify(products));
    this.sharedService.event.emit(products);
    console.log('cart', products);

    this.singleProduct = this.items.filter(product => {
      return product.id === id;
    });
    this.sharedService.addProductToCart(this.singleProduct[0]);
  }

  /**
   * Change color for heart icon
   */
  addEvent(data) {
    data.select = !data.select;
    console.log('iconcolor', data);
  }
}
