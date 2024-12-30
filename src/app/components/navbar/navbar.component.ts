import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private customerService: CustomerService,    private messageService: MessageService,
    private router: Router){}


  createCustomerValidation() {
    console.log("Funciona")
    const id = 1;
    this.customerService.getCustomerById(id).subscribe({
      next: foundCustomer => {
        // this.router.navigateByUrl('/customer-form/new')
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You dont have the authorization'
        });
        this.router.navigateByUrl('/home')
      }
    });
  }
}
