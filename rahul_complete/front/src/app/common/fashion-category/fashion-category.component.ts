import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-category',
  templateUrl: './fashion-category.component.html',
  styleUrls: ['./fashion-category.component.css']
})
export class FashionCategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  fashionCategories: any = [
    {id: 'digitalSurprises', img: '../../../assets/images/fashion_categories/1.jpg', title:'Digital Surprises',},
    {id: 'partyDecorations', img: '../../../assets/images/fashion_categories/2.jpg', title: 'Party Decorations'},
    {id: 'candlelightDinners', img: '../../../assets/images/fashion_categories/3.jpg', title: 'Candlelight Dinners'}
  ];

  gotoProductList(url: string, id: string) {
    this.router.navigate([url, id]);
  }
}
