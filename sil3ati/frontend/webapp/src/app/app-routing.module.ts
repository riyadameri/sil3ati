import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home/home-page/home-page.component';
import { RegisterComponent } from './component/account/register/register.component';
import { LoginComponent } from './component/account/login/login.component';
import { SuccessRegisterComponent } from './component/account/register/success-register/success-register.component';
import { FailureRegisterComponent } from './component/account/register/failure-register/failure-register.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent},
  {path:'confirmation-success',component:SuccessRegisterComponent},
  {path:'confirmation-failure',component:FailureRegisterComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
