import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customers-list/customers-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { LoginComponent } from './components/login/login.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    title: 'Página de Inicio'
  },
  {
    path: 'customer-form/:id',
    component: CustomerFormComponent,
    title: 'Formulario de Clientes'
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
    path: 'maintenance',
    component: MaintenanceComponent,
    title: 'Maintenance'
  },
  {
    path: 'errorPage',
    component: ErrorPageComponent,
    title: 'Error Page'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
