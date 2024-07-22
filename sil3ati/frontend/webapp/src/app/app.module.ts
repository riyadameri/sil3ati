import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/account/login/login.component';
import { RegisterComponent } from './component/account/register/register.component';
import { HomePageComponent } from './component/home/home-page/home-page.component';
import { HeaderComponent } from './component/home/layout/header/header.component';
import { FooterComponent } from './component/home/layout/footer/footer.component';
import { NavComponent } from './component/home/layout/nav/nav.component';
import { AccountComponent } from './component/home/account/account.component';
import { SupplierComponent } from './component/servicePages/supplier/supplier.component';
import { ShopComponent } from './component/servicePages/shop/shop.component';
import { CreateProductComponent } from './component/servicePages/create-product/create-product.component';
import { SeeProductComponent } from './component/servicePages/see-product/see-product.component';
import { FormsModule } from '@angular/forms';
import { KeyPassComponent } from './component/account/key-pass/key-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AccountComponent,
    SupplierComponent,
    ShopComponent,
    CreateProductComponent,
    SeeProductComponent,
    KeyPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
