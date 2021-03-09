import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';
import { Router } from '@angular/router';

const baseUrl: string = 'http://localhost:8080/api/files/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allProducts: Product[] = [];
  candlelightDinners: Product[] = [];
  homeSurprises: Product[] = [];
  availableNows: Product[] = [];
  digitalGifts: Product[] = [];
  newExperiences: Product[] = [];
  cakeDeliveries: Product[] = [];
  diyCelebrationKits: Product[] = [];
  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    // this.productsService.getProducts().subscribe((data: any) => {
    //   this.allProducts = data;
    //   console.log(this.allProducts);
    this.productsService.getAll().subscribe((data: any) => {
      console.log(data.products);
      data.products.forEach((product: any) => {
        if (product.published) {
          let imgs = product.img1.split(":");
          this.allProducts.push({
            id: product.id,
            category: product.category,
            title: product.title,
            shortDes: product.shortDes,
            detailDes: product.detailDes,
            location: product.location,
            price: parseInt(product.price),
            reviews: product.reveiws,
            rating: product.rating,
            img: baseUrl + imgs[0]
          })
        }
      });
      console.log(this.allProducts);

      this.allProducts.forEach((product: Product) => {
        switch (product.category) {
          case "candlelight": {
            this.candlelightDinners.push(product);
            console.log(this.candlelightDinners);
            break;
          }
          case "homeSurprise": {
            this.homeSurprises.push(product);
            console.log(this.homeSurprises)
            break;
          }
          case "availableNow": {
            this.availableNows.push(product);
            break;
          }
          case "digitalGift": {
            this.digitalGifts.push(product);
            break;
          }
          case "newExperience": {
            this.newExperiences.push(product);
            break;
          }
          case "cakeDelivery": {
            this.cakeDeliveries.push(product);
            break;
          }
          case "diyCelebrationKit": {
            this.diyCelebrationKits.push(product);
            break;
          }
        }
      });

      console.log(this.candlelightDinners);
      console.log(this.homeSurprises);
      console.log(this.availableNows);
    });


  }

  gotoProductDetail(url: string, id: number) {
    this.router.navigate([url, id]).then((e) => {
      if (e) {
        console.log('Navigation is successfully!');
      } else {
        console.log('Navigation is failed!');
      }

    })
  };

  recentReviews = [
    { id: 1, customer: 'Nancv Hitesh Bansal Daswani', review: '', productImg: '../../../assets/images/reviews/1.jpg', productTitle: 'Birthday Special Balloon Decoration', rating: '5.0' },
    { id: 2, customer: 'Vipul Sharma', review: '', productImg: '../../../assets/images/reviews/2.jpg', productTitle: 'Romantic Rose Gold Birthday Theme', rating: '5.0' },
    { id: 3, customer: 'Shivani Ksnodia', review: '', productImg: '../../../assets/images/reviews/3.jpg', productTitle: 'Pineapple Photo Cake', rating: '5.0' },
    { id: 4, customer: 'Yash Pancholi', review: '', productImg: '../../../assets/images/reviews/4.jpg', productTitle: 'A Royal Dinner', rating: '5.0' },
    { id: 5, customer: 'Anuradha Hans', review: '', productImg: '../../../assets/images/reviews/5.jpg', productTitle: 'Theme Surprise Box', rating: '5.0' },
    { id: 6, customer: 'Nancv Hitesh Bansal Daswani', review: '', productImg: '../../../assets/images/reviews/1.jpg', productTitle: 'Birthday Special Balloon Decoration', rating: '5.0' },
    { id: 7, customer: 'Nancv Hitesh Bansal Daswani', review: '', productImg: '../../../assets/images/reviews/1.jpg', productTitle: 'Birthday Special Balloon Decoration', rating: '5.0' },
    { id: 8, customer: 'Anuradha Hans', review: '', productImg: '../../../assets/images/reviews/5.jpg', productTilte: 'Theme Surprise Box', rating: '5.0' },
    { id: 9, customer: 'Shivani Ksnodia', review: '', productImg: '../../../assets/images/reviews/3.jpg', productTitle: 'Pineapple Photo Cake', rating: '5.0' },
    { id: 10, customer: 'Vipul Sharma', review: '', productImg: '../../../assets/images/reviews/2.jpg', productTitle: 'Romantic Rose Gold Birthday Theme', rating: '5.0' },
  ];

  slideConfig = {
    "slidesToShow": 4.5,
    "slidesToScroll": 1,
    "nextArrow": "<i class='fa fa-chevron-left fa-lg p-2 rounded-circle text-primary' style='position: absolute !important; top: 50% !important; left: 13px !important; z-index: 1000 !important; background-color: rgb(6 6 6 / 58%)'></i>",
    "prevArrow": "<i class='fa fa-chevron-right fa-lg p-2 rounded-circle text-primary' style='position: absolute !important; top: 50% !important; right: 13px !important; z-index: 1001 !important; background-color: rgb(6 6 6 / 58%)'></i>",
    // "dots": true,
    "infinite": true,
    "autoplay": false,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          initialSlide: 1,
        }
      },{
        breakpoint: 940,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
    // "autoplaySpeed": 3000

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
