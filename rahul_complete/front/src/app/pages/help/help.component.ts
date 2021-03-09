import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  user: any;
  constructor( private router: Router ) { }
  topSellings = [
    {id: 'roomDecoration', title: 'Room Decoration', description: '', img: '../../../assets/images/topSellings/1.jpg'},
    {id: 'candlelightDinners', title: 'Candlelight Dinners', description:'', img: '../../../assets/images/topSellings/2.jpg'},
    {id: 'surprise', title: 'Surprises & Gifts', description: '',  img: '../../../assets/images/topSellings/3.jpg'},
    {id: 'cakeAndBouquets', title: 'Cake & Bouquets', description: '',  img: '../../../assets/images/topSellings/4.jpg'}
  ]
  ngOnInit(): void {
    this.user = {id: 'k2i', username: 'Raful', phoneNumber: '79064817928'}
  }

  gotoProductList(url: string, id: string) {
    this.router.navigate([url, id]);
  }
}
