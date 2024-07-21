import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"login", component:LoginComponent}
];
