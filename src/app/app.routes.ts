import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customers-list/customers-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Sistema de Gestion al Cliente'
  },
  {
    path: 'customer-form/:id',
    component: CustomerFormComponent,
    title: 'Formulario de Clientes'
  },
  {
    path: 'home',
    component: CustomerListComponent,
    title: 'Página de Inicio'
  },
  {
    path: 'logIn',
    component: LoginComponent,
    title: 'Log In'
  },
  {
    path: 'signIn',
    component: SignInComponent,
    title: 'SignIn'
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
