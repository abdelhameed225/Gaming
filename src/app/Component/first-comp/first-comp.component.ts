import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-first-comp',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.css']
})
export class FirstCompComponent {

  isButtonVisible = false;

  showBtn() {
    this.isButtonVisible = !this.isButtonVisible;
  }
  banner: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    // dots: true,
    dotsEach:1 ,
    animateOut:true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


  /////
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
}


