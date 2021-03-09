import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api/profile/";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    return this.http.get(`${API_URL}${id}`);
  }

  updateUser(id:any, data: any): Observable<any> {
    return this.http.put(`${API_URL}${id}`, data);
  }

  updatePassword(id:any, data: any): Observable<any> {
    return this.http.put(`${API_URL}password/${id}`, data);
  }
}
