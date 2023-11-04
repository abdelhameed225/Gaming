import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstCompComponent } from './Component/first-comp/first-comp.component';
import { LoginComponent } from './Component/login/login.component';
import { RegesterComponent } from './Component/regester/regester.component';
import { AboutusComponent } from './Component/aboutus/aboutus.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { CatProductsComponent } from './Component/cat-products/cat-products.component';
import { ProductViewComponent } from './Component/product-view/product-view.component';

const routes: Routes = [
  { path: 'Home', component:FirstCompComponent},
  { path: 'login', component:LoginComponent},
  { path: 'regester', component:RegesterComponent},
  { path: 'aboutus', component:AboutusComponent},
  { path: 'products', component:ProductDetailsComponent},
  { path: 'categories', component:CategoriesComponent},
  { path: 'categories/:id', component:CatProductsComponent},
  { path: 'product/:id', component:ProductViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
