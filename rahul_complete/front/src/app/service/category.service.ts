import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent, Category, SubMenu } from '../model/category';


const API_URL = "http://localhost:8080/api/menu/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createParent(data: any): Observable<any> {
    return this.http.post(`${API_URL}parents`, data);
  }

  createSubMenu(data: any): Observable<any> {
    return this.http.post(`${API_URL}submenus`, data);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${API_URL}categories`, data);
  }

  getParentsAll(): Observable<any> {
    console.log("parents");
    return this.http.get(`${API_URL}parents`);
  }
  getSubMenusAll(): Observable<any> {
    console.log("submenus");
    return this.http.get(`${API_URL}submenus`);
  }
  getCategoriesAll(): Observable<any> {
    console.log("categories");
    return this.http.get(`${API_URL}categories`);
  }
  findByTitle(title: any): Observable<Parent[]> {
    console.log(title);
    return this.http.get<Parent[]>(`${API_URL}?title=${title}`);
  }
  deleteParent(id: any): Observable<any> {
    console.log(id);
    return this.http.delete(`${API_URL}parent/${id}`);
  }

  deleteSubMenu(id:any): Observable<any> {
    console.log(id);
    return this.http.delete(`${API_URL}submenu/${id}`);
  }

  deleteCategory(id:any): Observable<any> {
    console.log(id);
    return this.http.delete(`${API_URL}category/${id}`);
  }

  getSubMenusByParent(parent_id: any): Observable<any> {
    console.log(parent_id);
    return this.http.get(`${API_URL}subMenus?parent_id=${parent_id}`);
  }
  getCategoriesById(parent_id:any, subMenu_id: any): Observable<any> {
    console.log(parent_id, subMenu_id);
    return this.http.get(`${API_URL}categories?parent_id=${parent_id}&subMenu_id=${subMenu_id}`)
  }
  updateParent(parent_id:any, parent: Parent): Observable<any> {
    console.log(parent_id);
    return this.http.put(`${API_URL}parent/${parent_id}`, parent)
  }
  updateSubMenu(subMenu_id:any, subMenu: SubMenu): Observable<any> {
    console.log(subMenu_id);
    return this.http.put(`${API_URL}submenu/${subMenu_id}`, subMenu);
  }
  updateCategory(category_id:any, category:Category): Observable<any> {
    return this.http.put(`${API_URL}category/${category_id}`, category);
  }
}
