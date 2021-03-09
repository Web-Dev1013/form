import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'ngSlick';


  slides = [
    { img: '../../../assets/images/background/1.jpg' },
    { img: '../../../assets/images/background/2.jpg' },
    { img: '../../../assets/images/background/3.jpg' }
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<i class='fa fa-chevron-left nextArrow' style='position: absolute !important; top: 50% !important; left: 10px !important; z-index: 1000 !important; '></i>",
    "prevArrow": "<i class='fa fa-chevron-right prevArrow' style='position: absolute !important; top: 50% !important; right: 10px !important; z-index: 1003 !important; '></i>",
    "dots": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 3000

  };

  slickInit(e: any) {
    console.log(e);
  }

  breakpoint(e: any) {
    console.log(e);
  }

  afterChange(e: any) {
    console.log(e);
  }

  beforeChange(e: any) {
    console.log(e);
  }


}
