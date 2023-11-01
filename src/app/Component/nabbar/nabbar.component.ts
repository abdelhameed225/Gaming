import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nabbar',
  templateUrl: './nabbar.component.html',
  styleUrls: ['./nabbar.component.css']
})
export class NabbarComponent {
  navbarfixed: boolean = false;
  @HostListener('window:scroll',['$event'])onscroll(){
    if (window.scrollY > 56){
      this.navbarfixed = true;
    }
    else{
      this.navbarfixed = false;
    }
  }
}
