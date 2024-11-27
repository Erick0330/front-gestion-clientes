import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customers-list/customers-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

export const routes: Routes = [
    {
        path:'',
        component:CustomerListComponent,
        title:'Página de Inicio'
    },
    {
        path:'customer-form/:id',
        component:CustomerFormComponent,
        title:'Formulario de Clientes'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
