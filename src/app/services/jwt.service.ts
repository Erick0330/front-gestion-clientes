import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private api : string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  register(signRequest:any):Observable<any>{
    return this.http.post(this.api + 'signup', signRequest)
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post(this.api + 'login', loginRequest)
  }
}
