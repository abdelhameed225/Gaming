import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css'],
})
export class NavbarLoginComponent {
  navbarfixed: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 56) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
