import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api/products";
const API_UPLOAD_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  
  constructor( private http: HttpClient ) { }

  getAll(): Observable<any> {
    
    return this.http.get(API_URL);
  }

  findByTitle(userName: any, userRole: any, title: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}?userName=${userName}&title=${title}&userRole=${userRole}`);
  }

  
  getFiles(): Observable<any> {
    return this.http.get(`${API_UPLOAD_URL}/files`);
  }
}
