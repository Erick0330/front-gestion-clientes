import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Customer } from '../../Entitys/customer';
import { CustomerService } from '../../services/customer.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, NavbarComponent],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  isDeleteInProgress: boolean = false

  constructor(private customerService: CustomerService,    private messageService: MessageService,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.listCustomers();
  }

  listCustomers() {
    this.customerService.getCustomerList().subscribe(
      data => {
        this.customers = data;
        console.log(this.customers);
      }
    );
  }

  deleteCustomer(id: number) {

    this.isDeleteInProgress = true
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Customer deleted'
        });
        this.isDeleteInProgress = false
        this.listCustomers();
      },
      error: () => {
        this.isDeleteInProgress = false
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Fail to delete customer, you dont have the authorization'
        });
      }
    })
  }


}



