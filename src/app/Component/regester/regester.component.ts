import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css'],
})
export class RegesterComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    }
  RegisterForm = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    City: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    Government: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    Street: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    BulidingNumber: new FormControl(null, [
      Validators.required,

      Validators.maxLength(15),
    ]),
    PostalCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),

    PhoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('[- +()0-9]{10,12}'),
    ]),
    Password: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });
  get getUserName() {
    return this.RegisterForm.controls['UserName'];
  }
  get getCity() {
    return this.RegisterForm.controls['City'];
  }
  get getGovernment() {
    return this.RegisterForm.controls['Government'];
  }
  get getStreet() {
    return this.RegisterForm.controls['Street'];
  }
  get getEmail() {
    return this.RegisterForm.controls['Email'];
  }
  get getConfirmPassword() {
    return this.RegisterForm.controls['ConfirmPassword'];
  }
  get getPassword() {
    return this.RegisterForm.controls['Password'];
  }
  get getPhoneNumber() {
    return this.RegisterForm.controls['PhoneNumber'];
  }
  get getPostalCode() {
    return this.RegisterForm.controls['PostalCode'];
  }
  get getBulidingNumber() {
    return this.RegisterForm.controls['BulidingNumber'];
  }
  isLoading: boolean = false;
  Register(e: Event) {
    e.preventDefault();
    // console.log(this.RegisterForm);
    this.isLoading = true;
    if (this.RegisterForm.status == 'VALID') {
      //coneection with api

      this._AuthService.register(this.RegisterForm.value).subscribe({
        next: (response) => {
          // console.log(response);

          this.isLoading = false;
          this.toastr.success('Please login', 'User created successfully');
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(JSON.parse(error.error), 'Failed to register');
          console.log(error);
        },
      });
    }
  }
}
