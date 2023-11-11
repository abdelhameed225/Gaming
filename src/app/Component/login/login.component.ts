import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}
  isLoading : boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
  }, 800);  }
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

  Login(e: Event) {
    e.preventDefault();
    console.log(this.LoginForm);

    if (this.LoginForm.status == 'VALID') {
      this._AuthService.login(this.LoginForm.value).subscribe({
        next: (response) => {
          this._AuthService.setUserData(response);

          this._Router.navigate(['/Home']);
        },
        error: (error) => {
          console.log('error');
          this.toastr.error(JSON.parse(error.error).title, 'Failed To login');
        },
      });
      //   //coneection
    }
  }
}
