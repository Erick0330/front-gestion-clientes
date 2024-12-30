import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private api : string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

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


  register(signRequest:any):Observable<any>{
    return this.http.post(this.api + 'admin/signup', signRequest, {
      headers: this.createAuthorizationHeader()
    })
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post(this.api + 'login', loginRequest)
  }
}
