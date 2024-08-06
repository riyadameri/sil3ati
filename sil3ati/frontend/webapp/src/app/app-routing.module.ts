import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home/home-page/home-page.component';
import { RegisterComponent } from './component/account/register/register.component';
import { LoginComponent } from './component/account/login/login.component';
import { SuccessRegisterComponent } from './component/account/register/success-register/success-register.component';
import { FailureRegisterComponent } from './component/account/register/failure-register/failure-register.component';
import { NewProductComponent } from './component/home/products/new-product/new-product.component';
import { EditComponent } from './component/home/products/edit/edit.component';

const routes: Routes = [
  {path:'home', component: HomePageComponent},
  {path:'newProduct', component: NewProductComponent },
  {path:'',component:LoginComponent},
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent},
  {path:'success-register',component:SuccessRegisterComponent},
  {path:'confirmation-failure',component:FailureRegisterComponent},
  {path:'edit',component:EditComponent},
  {path:'', component: HomePageComponent },
  {path:'**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
