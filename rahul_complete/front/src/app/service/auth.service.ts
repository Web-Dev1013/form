import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log(username);
    return this.http.post('http://localhost:8080/api/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, roles: []): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      roles
    }, httpOptions);
  }

  updatePassword(username: string, user:any): Observable<any> {
    console.log(user);
    console.log(username);
    return this.http.put(`${AUTH_API}update/${username}`, user, httpOptions);
  }
}