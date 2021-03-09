import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api/booking/";
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${API_URL}`, data);
  }
  

  findBooking(params: any): Observable<any> {
    console.log(params);
    return this.http.get(API_URL, { params });
  }

  findByLocation(location: any):Observable<any> {
    console.log(location);
    return this.http.get(`${API_URL}?location=${location}`)
  }
}
