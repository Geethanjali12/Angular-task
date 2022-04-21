import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() items
  showMainContent: boolean = true;
  data: any;
  userDetails: any;
  loginButtonHide: any;
  public cartIncrement: number = 0;

  constructor(private storageService: StorageService, private sharedStorage: SharedService) { }

  ngOnInit(): void {
    this.storageService.getItem('cart');
    console.log('navbar', this.storageService.getItem('cart'));
    this.showHideIcon();

    this.sharedStorage.getProducts().subscribe(data => {
      this.cartIncrement = data.length;
    })
  }

  public showHideIcon() {
    const userDetails: any = localStorage.getItem('login');
    console.log('get user details', userDetails);
    const userDetail = JSON.parse(userDetails);
    if (userDetails == null) {
      this.loginButtonHide = false;
    } else {
      this.loginButtonHide = true;
    }
  }
}

