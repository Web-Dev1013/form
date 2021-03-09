import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';
import { ActivatedRoute, Router } from '@angular/router';

const baseUrl = "http://localhost:8080/api/files/";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  category_id: string = '';
  productsbyCategory: Product[] = [];


  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    // this.category_id = '';
    // this.category_id = this.activatedRoute.snapshot.params['id'];
    // console.log(this.category_id);

    this.activatedRoute.paramMap.subscribe((params: any) => {
      // this.products.forEach((p: Product) => {
      //   if (p.id == params.id) {
      //     this.product = p;
      //   }
      // });

      this.productsbyCategory = [];
      this.productsService.getAll().subscribe((data: any) => {
        console.log(data.products);
        data.products.forEach((product: any) => {
          if (product.published) {
            if (product.category == params.params.id) {
              let imgs = product.img1.split(":");
              this.productsbyCategory.push({
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
          }
        });
        console.log(this.productsbyCategory);

      });
      console.log(params.params.id);
    });


    console.log(this.productsbyCategory);
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
}
