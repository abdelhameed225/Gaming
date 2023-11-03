import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstCompComponent } from './Component/first-comp/first-comp.component';
import { LoginComponent } from './Component/login/login.component';
import { RegesterComponent } from './Component/regester/regester.component';

const routes: Routes = [
  { path: 'Home', component:FirstCompComponent},
  { path: 'login', component:LoginComponent},
  { path: 'regester', component:RegesterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
