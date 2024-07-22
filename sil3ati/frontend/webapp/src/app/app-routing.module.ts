import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home/home-page/home-page.component';
import { RegisterComponent } from './component/account/register/register.component';
import { LoginComponent } from './component/account/login/login.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
