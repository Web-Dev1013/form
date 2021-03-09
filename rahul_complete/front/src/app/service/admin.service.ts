import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

const API_URL = "http://localhost:8080/api/users/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor( private http: HttpClient ) { }

  getAll(params: any): Observable<any> {
    console.log(params);
    return this.http.get(`${API_URL}all`, { params });
  }

  findByTitle(searchTitle: any): Observable<User[]> {
    console.log(searchTitle);
    return this.http.get<User[]>(`${API_URL}all?searchTitle=${searchTitle}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}${id}`, data);
  }
}
