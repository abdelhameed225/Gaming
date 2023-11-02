import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstCompComponent } from './Component/first-comp/first-comp.component';

const routes: Routes = [
  { path: 'Home', component:FirstCompComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
