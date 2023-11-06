import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-nabbar',
  templateUrl: './nabbar.component.html',
  styleUrls: ['./nabbar.component.css'],
})
export class NabbarComponent {
  // get user details
  isLogin: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;
  constructor(private _AuthService: AuthService) {
    _AuthService.user.subscribe({
      next: () => {
        const user = _AuthService.user.getValue();
        console.log('user', user);
        if (user !== null) {
          this.isLogin = true;
          this.userData = user;
          this.isAdmin = user.roles.includes('Admin');
          console.log('isAdmin', this.isAdmin);
        } else {
          this.isLogin = false;
          this.isAdmin = false;
          this.userData = null;
        }
      },
    });
  }
  navbarfixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 56) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  handleLogout() {
    this._AuthService.logout();
  }
}
