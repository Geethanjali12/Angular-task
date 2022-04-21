import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private router: Router) {

    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Form control
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Login
   */
  public login() {
    const loginDetails: any = localStorage.getItem('register');
    const details = JSON.parse(loginDetails);
    if (details.email == this.loginForm.value.email && details.password == this.loginForm.value.password) {
      localStorage.setItem('login', JSON.stringify(this.loginForm.value))
      alert('login successful')
      this.router.navigateByUrl('/');
    } else {
      alert('invalid details')
    }

  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
