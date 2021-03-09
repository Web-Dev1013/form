import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit():void {

  }
  slides = [
    {img: '../../../assets/images/categories/icon-balloon-decorations-min.png', title: 'Decorations', id: 'decoration'},
    {img: '../../../assets/images/categories/icon-bouquets-min.png', title: 'Bouquets', id: 'bouquets'},
    {img: '../../../assets/images/categories/icon-cakes-min.png', title: 'Cakes', id: 'cakes'},
    {img: '../../../assets/images/categories/icon-candlelight-dinner-min.png', title: 'Dinners', id: 'dinners'},
    {img: '../../../assets/images/categories/icon-celebrity-min.png', title: 'Celebrity Wishes', id: 'celebrityWishes'},
    {img: '../../../assets/images/categories/icon-digital-surprises-min.png', title: 'Digital Gifts', id: 'digitalGits'},
    {img: '../../../assets/images/categories/icon-diy-kit-min.png', title: 'DIY Decor Kits', id: 'diyDecorKits'},
    {img: '../../../assets/images/categories/icon-helium-balloons-min.png', title: 'Balloon Box', id: 'balloonBox'},
    {img: '../../../assets/images/categories/icon-home-surprises-min.png', title: 'Surprises', id: 'surprises'},
    {img: '../../../assets/images/categories/icon-personalised-frames-min.png', title: 'Frames', id: 'frames'}
  ];
  // slideConfig = { "slidesToShow": 4, "slidesToScroll": 1 };
  slideConfig = {
    "slidesToShow": 8,
    "slidesToScroll": 1,
    "nextArrow": '<i class="fa fa-chevron-circle-right mt-3"></i>',
    "prevArrow": '<i class="fa fa-chevron-circle-left mt-3" aria-hidden="true"></i>',
    // "dots": true,
    "infinite": true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 6,
          initialSlide: 1,
        }
      },{
        breakpoint: 660,
        settings: {
          slidesToShow: 4,
          initialSlide: 1
        }
      }
    ]
  };

  slickInit(e: any) {
    console.log(e);
  };

  breakpoint(e:any) {
    console.log(e);
  };

  afterChange(e: any) {
    console.log(e);
  };

  beforeChange(e: any) {
    console.log(e);
  };

  gotoProductList(url: string, id: string) {
    this.router.navigate([url, id]);
  }
}


