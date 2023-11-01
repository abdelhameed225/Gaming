import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabbarComponent } from './Component/nabbar/nabbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { FirstCompComponent } from './Component/first-comp/first-comp.component';
import { SwiperModule } from 'swiper/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeComponent } from './Component/home/home.component';
import {LoginComponent } from './Component/login/login.component';
import { HttpClientModule }from '@angular/common/http';


@NgModule({
  imports: [SwiperModule],
  declarations: [
  ],
})
export class YourAppModule {}


@NgModule({
  declarations: [
    AppComponent,
    NabbarComponent,
    FooterComponent,
    FirstCompComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
