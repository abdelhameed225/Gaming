import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { LoginComponent } from './Component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarLoginComponent } from './Component/navbar-login/navbar-login.component';
import { RegesterComponent } from './Component/regester/regester.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { ProductstopComponent } from './Component/productstop/productstop.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { CatProductsComponent } from './Component/cat-products/cat-products.component';
import { CattopComponent } from './Component/cattop/cattop.component';
import { ProductViewComponent } from './Component/product-view/product-view.component';
import { CartComponent } from './Component/cart/cart.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AdminProductComponent } from './Component/admin-product/admin-product.component';
import { AdminCategoryComponent } from './Component/admin-category/admin-category.component';
import { AddnewProductComponent } from './Component/addnew-product/addnew-product.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { OrdersummaryComponent } from './Component/ordersummary/ordersummary.component';
import { AddNewCatComponent } from './Component/add-new-cat/add-new-cat.component';

@NgModule({
  imports: [SwiperModule],
  declarations: [],
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
    NavbarLoginComponent,
    RegesterComponent,
    AboutusComponent,
    ProductDetailsComponent,
    ProductstopComponent,
    CategoriesComponent,
    CatProductsComponent,
    CattopComponent,
    ProductViewComponent,
    CartComponent,
    WishlistComponent,
    DashboardComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AddnewProductComponent,
    OrdersummaryComponent,
    AddNewCatComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
