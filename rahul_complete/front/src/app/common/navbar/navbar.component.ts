import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../service/menu.service';
import { CityService } from '../../service/city.service';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';
import { CategoryService } from '../../service/category.service';

import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { Parent, SubMenu, Category } from 'src/app/model/category';

const baseUrl = "http://localhost:8080/api/files/";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  parentMenus: Parent[] = [];
  subMenus: any[] = [];

  productsbySubmenu: Product[] = [];

  //log in variable
  loginForm: any = {
    usernameLog: null,
    passwordLog: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  //registore form variable
  registerForm: any = {
    usernameReg: null,
    emailReg: null,
    passwordReg: null,
    rolesReg: null
  };
  isSuccessful = false;
  isSignUpFailed = false;

  //navbar variable
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  //variable to show login or register form 
  isShowRegister = false;
  isShowLogin = true;
  authTitle: string = '';


  menus: any[] = [];
  cities: any[] = [];
  city: string = '';
  login: boolean = true;
  display: boolean = true;
  products: Product[] = [];

  currentIndex = -1;

  title = '';
  page = 1;
  count = 0;
  pageSize = 12;
  pageSizes = [12, 16, 20];

  categories: any = [];

  locations = [
    { id: 'digitalCopy', title: 'Digital Copy', total_num: 16 },
    { id: 'digitalGift', title: 'Digital Gift', total_num: 16 },
    { id: 'atYourHome', title: 'At your Home', total_num: 7 },
    { id: 'atYourLocation', title: 'At your Location', total_num: 7 },
    { id: 'digitalFrame', title: 'Digital Frame', total_num: 7 },
    { id: 'videoCall', title: 'Video Call', total_num: 3 }
  ];
  constructor(private categoryService: CategoryService, private authService: AuthService, private tokenStorage: TokenStorageService, private menuService: MenuService, private cityService: CityService, private productsService: ProductsService, private router: Router) {

  }

  ngOnInit(): void {

    //login//
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.authTitle = "Please Sing in."
    // this.menuService.getMenus().subscribe((data: any) => {
    //   console.log(data);
    //   this.menus = data;
    // });
    this.menus = this.menuService.menu;
    // this.cityService.getCities().subscribe((cities: any) => {
    //   this.cities = cities;
    // });

    this.categoryService.getParentsAll().subscribe((data: any) => {
      this.parentMenus = data;
    })
    this.cities = this.cityService.cities;
    this.city = "Delhi NCR";

    // this.productService.getProducts().subscribe((data: any) => {
    //   this.products = data;
    // });
    this.productsService.getAll().subscribe((data: any) => {
      console.log(data.products);
      data.products.forEach((product: any) => {
        if (product.published) {
          let imgs = product.img1.split(":");
          this.products.push({
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

    });

    this.categoryService.getSubMenusAll().subscribe((data: any) => {
      this.categories = data;
      console.log(data);
    },
      (error: any) => {
        console.log(error);
      })

    this.productsbySubmenu = this.products;

  }

  //subMenu display
  gotoSubMenu(parent_id: any) {
    this.subMenus = [];
    this.categoryService.getSubMenusByParent(parent_id).subscribe((data: any) => {

      data.forEach((subMenu: any) => {
        this.categoryService.getCategoriesById(parent_id, subMenu.subMenu_id).subscribe((cates: any) => {
          this.subMenus.push({
            subMenu_id: subMenu.subMenu_id,
            subMenu_name: subMenu.subMenu_name,
            cates: cates
          })
        });

      });

    });
  }

  //category display

  // gotoCategory(parent_id: any, subMenu_id: any) {
  //   this.categoryService.getCategoriesById(parent_id, subMenu_id).subscribe((data: any) => {
  //     this.cates = data;
  //   });
  // }
  // login submit function
  onSubmitLog(): void {
    const { usernameLog, passwordLog } = this.loginForm;

    this.authService.login(usernameLog, passwordLog).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  //register submit function
  onSubmitReg(): void {
    const { usernameReg, emailReg, passwordReg, rolesReg } = this.registerForm;
    console.log(rolesReg);
    let rolesReg1: any = [rolesReg];
    console.log(rolesReg1);
    this.authService.register(usernameReg, emailReg, passwordReg, rolesReg1).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.gotoLogin();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  //logout controller
  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  select_city(id: string) {
    this.cities.forEach((city) => {
      if (city.id == id) {
        this.city = city.title;
        this.display = false;
      }
    });
    // this.display = "block";
  }

  // getRequestParams(searchTitle: string, page: number, pageSize: number): any {
  //   // tslint:disable-next-line:prefer-const
  //   let params: any = {};
  //   if (searchTitle) {
  //     params[`title`] = searchTitle;
  //   }

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // retrieveTutorials(): void {
  //   const params = this.getRequestParams(this.title, this.page, this.pageSize);

  //   this.productService.getByParams(params)
  //     .subscribe(
  //       response => {
  //         const { products, totalItems } = { products: this.products, totalItems: this.products.length };
  //         this.products = products;
  //         this.count = totalItems;
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // handlePageChange(event: number): void {
  //   this.page = event;
  //   this.retrieveTutorials();
  // }

  // handlePageSizeChange(event: any): void {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.retrieveTutorials();
  // }

  //go to register form
  gotoRegister() {
    this.registerForm.usernameReg = "";
    this.registerForm.passwordReg = "";
    this.registerForm.emailReg = "";

    this.authTitle = "Please Sign up";
    this.isShowRegister = true;
    this.isShowLogin = false;
  }
  gotoLogin() {
    this.loginForm.usernameLog = "";
    this.loginForm.passwordLog = "";
    this.authTitle = "Please Sign in";
    this.isShowRegister = false;
    this.isShowLogin = true;

  }
  gotoProductDetail(url: string, id: number) {

    this.router.navigate([url, id]);

  }

  getProductbySubmenu(category: SubMenu) {
    this.productsbySubmenu = [];
    this.categoryService.getCategoriesById(category.parent_id, category.subMenu_id).subscribe((data: any) => {
      let cates = data;
      console.log(cates);
      cates.forEach((cate: Category) => {
        this.products.forEach((product: Product) => {
          if (product.category == cate.category_id) {
            this.productsbySubmenu.push(product);
            console.log(this.productsbySubmenu);
          }
        })
      })
    })
  }

}
