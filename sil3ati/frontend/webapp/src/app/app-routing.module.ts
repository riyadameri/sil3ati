import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home/home-page/home-page.component';
import { RegisterComponent } from './component/account/register/register.component';
import { LoginComponent } from './component/account/login/login.component';
import { SuccessRegisterComponent } from './component/account/register/success-register/success-register.component';
import { FailureRegisterComponent } from './component/account/register/failure-register/failure-register.component';
import { NewProductComponent } from './component/home/products/new-product/new-product.component';
import { EditComponent } from './component/home/products/edit/edit.component';
import { AccountComponent } from './component/home/account/account.component';
import { HomeaccountComponent } from './component/home/account/homeaccount/homeaccount.component';
import { InfoComponent } from './component/home/account/info/info.component';
import { DataproComponent } from './component/home/account/datapro/datapro.component';
import { SecurityComponent } from './component/home/account/security/security.component';
import { PaymmentComponent } from './component/home/account/paymment/paymment.component';
import { UpdateUserComponent } from './component/home/account/update-user/update-user.component';

const routes: Routes = [
  {path:'home', component: HomePageComponent},
  {path:'newProduct', component: NewProductComponent },
  {path:'',component:LoginComponent},
  {path:'account',component:AccountComponent},
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent},
  {path:'success-register',component:SuccessRegisterComponent},
  {path:'confirmation-failure',component:FailureRegisterComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'edit',component:EditComponent},
  {path:'', component: HomePageComponent },
  {path:'account/infouser', component:InfoComponent  },
  {path:'account/data-privacy', component:DataproComponent  },
  {path:'account/security', component:SecurityComponent  },
  {path:'account/paymment', component:PaymmentComponent  },
  {path:'updateuser', component:UpdateUserComponent},
  {path:'**', component: HomePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
