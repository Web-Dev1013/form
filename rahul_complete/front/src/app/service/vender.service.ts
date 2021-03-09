import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../model/experience';

const API_URL = 'http://localhost:8080/api/experiences';
const API_UPLOAD_URL = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class VenderService {

  constructor( private http: HttpClient ) { }

  getAll(params: any): Observable<any> {
    console.log(params);
    return this.http.get(API_URL, { params });
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  get(id: any): Observable<Experience> {
    return this.http.get(`${API_URL}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }

  findByTitle(userName: any, userRole: any, title: any): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${API_URL}?userName=${userName}&title=${title}&userRole=${userRole}`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${API_UPLOAD_URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${API_UPLOAD_URL}/files`);
  }
}
