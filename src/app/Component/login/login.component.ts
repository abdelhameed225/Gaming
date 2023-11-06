import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  LoginForm = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  get getUserName() {
    return this.LoginForm.controls['UserName'];
  }
  get getPassword() {
    return this.LoginForm.controls['Password'];
  }
  isLoading: boolean = false;

  Login(e: Event) {
    e.preventDefault();
    console.log(this.LoginForm);

    if (this.LoginForm.status == 'VALID') {
      this._AuthService.login(this.LoginForm.value).subscribe({
        next: (response) => {
          this._AuthService.setUserData(response);

          this.isLoading = false;
          this._Router.navigate(['/Home']);
        },
        error: (error) => {
          console.log(error);
        },
      });
      //   //coneection
    }
  }
}
