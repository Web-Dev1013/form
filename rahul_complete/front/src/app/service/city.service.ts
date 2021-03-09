import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../model/city';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  cities: City[];
  constructor(private httpClient: HttpClient) { 
    this.cities = [
      new City('delhi', 'Delhi NCR', '../../../assets/images/city/1.png', ''),
      new City('jaipur', 'Jaipur', '../../../assets/images/city/2.png', ''),
      new City('bangalore', 'Bangalore', '../../../assets/images/city/3.png', ''),
      new City('kolkata', 'Kolkata', '../../../assets/images/city/4.png', ''),
      new City('indore', 'Indore', '../../../assets/images/city/5.png', ''),
      new City('pune', 'Pune', '../../../assets/images/city/6.png', ''),
      new City('across', 'Across India', '../../../assets/images/city/7.png', '')
    ];
  }


}
