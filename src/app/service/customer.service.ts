import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Entitys/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api : string = 'http://localhost:8080/api/customers';


  constructor(private http:HttpClient) { }

  getCustomerList():Observable<Customer []>{
    return this.http.get<Customer[]>(this.api);

  }

  getCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(this.api + '/' + id);
  }

  createCustomer(customer:Customer, image:File):Observable<Customer>{
    const formData = new FormData()
    formData.append('customer', new Blob([JSON.stringify(customer)], {type:'application/json'}));
    formData.append('file', image)

    return this.http.post<Customer>(this.api, formData);
  }

  updateCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.api + '/' + customer.id, customer);
  }

  deleteCustomer(id:number) {
    return this.http.delete(this.api + '/' + id);
  }

  updateCustomerImage(id:number, image:File):Observable<Customer>{
    const formData = new FormData()
    formData.append('file', image)
    return this.http.put<Customer>(this.api + '/' + id+'/image', formData);
  }
}
