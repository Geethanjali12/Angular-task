import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './pages/menus/menus.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: MenusComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
