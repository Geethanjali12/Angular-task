import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  @Output() submitChange = new EventEmitter<any>();

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private router: Router) {

    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * form control
   */
  get f() {
    return this.registerForm.controls;
  }
  /**
   * register
   */
  onSubmit() {
    if (this.registerForm.valid) {
      alert('User form is valid!!')
      this.storageService.setItem('register', JSON.stringify(this.registerForm.value));
      this.router.navigateByUrl('/');
      console.log('register', this.storageService.setItem('register', JSON.stringify(this.registerForm.value)));

    } else {
      alert('User form is not valid!!')
    }
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
