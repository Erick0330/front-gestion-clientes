import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Entitys/customer';
import { User } from '../Entitys/user';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api : string = 'http://localhost:8080/api/customers';


  constructor(private http:HttpClient) { }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      console.log("JWT token found in local storage ", jwtToken)
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    }
    else{
      console.log("JWT token not found en local storage");
    }

    return new HttpHeaders();
  }

  getCustomerList():Observable<Customer []>{
    return this.http.get<Customer[]>(this.api);

  }

  getCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(this.api + '/admin/' + id , {
      headers: this.createAuthorizationHeader()
    });
  }

  createCustomer(customer:Customer, image:File| null):Observable<Customer>{
    const formData = new FormData()
    formData.append('customer', new Blob([JSON.stringify(customer)], {type:'application/json'}));
    if(image != null)
      formData.append('file', image)

    return this.http.post<Customer>(this.api + '/admin', formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.api + '/admin/' + customer.id, customer, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCustomer(id:number) {
    return this.http.delete(this.api + '/admin/' + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCustomerImage(id:number, image:File):Observable<Customer>{
    const formData = new FormData()
    formData.append('file', image)
    return this.http.put<Customer>(this.api + '/admin/' + id +'/image', formData, {
      headers: this.createAuthorizationHeader()
    });
  }

}
