import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  LoginForm=new FormGroup({
    UserName:new FormControl('',[
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3)

    ]),
    Password:new FormControl('',[
      Validators.required,
      Validators.minLength(8)


    ]),

  })
  get getUserName(){
    return this.LoginForm.controls['UserName']
  }
  get getPassword(){
    return this.LoginForm.controls['Password']
  }

  Login(e:Event){
    e.preventDefault();
    console.log(this.LoginForm)
  
    // if(this.LoginForm.status=='VALID'){
    //   //coneection
    // }
}
}

