import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { PagenotfoundComponent } from './error-pages/pagenotfound/pagenotfound.component';
const routes: Routes = [
  {path:'login' , component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'forget',component:ForgetPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'reset',component:ResetPasswordComponent},
  
  { path: '404', component: PagenotfoundComponent},

  {path:'',redirectTo:'/registration' ,pathMatch: 'full'},

  



  {path:'**',redirectTo:'/404',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
