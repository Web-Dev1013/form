import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { BookingService } from '../../service/booking.service';

const baseUrl = "http://localhost:8080/api/files";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  bookdate = '';
  booktime = '';
  username = '';
  useremail = '';
  isCheckout = false;

  more_show: boolean = false;
  buttonIcon: string = '';

  allProducts: Product[] = [];
  similarProducts: Product[] = [];

  product_id: number = 0;
  current_rating: number = 0;

  currentProduct: any;
  products_customize: Product[] = [];
  addedDecorations: Product[] = [];
  total_price: number = 0;
  added_count: number = 0;
  isBooking: boolean = false;
  bookingButtonName: string = 'BOOK NOW';
  detail_view: boolean = false;
  icon: string = 'fa fa-minus';

  paymentHandler: any = null;
  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private bookingService: BookingService, private elementRef: ElementRef, private router: Router, private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    this.buttonIcon = "fa fa-plus";
    this.product_id = this.activatedRoute.snapshot.params['id'];

    this.products_customize = [
      new Product(1, 'decoration', 'Guitarist', 'A Private Guitarist. The artists will not wait more than 30 minutes at the location from the chosen time slot', 'This is detail description.', 'This is location.', 3000, '', 0, '../../../assets/images/customise/1.jpg'),
      new Product(2, 'decoration', 'Bouquet of 20 Roses', 'A very beautiful red roses bouquet', 'This is detail description.', 'This is location.', 7000, '', 0, '../../../assets/images/customise/2.jpg'),
      new Product(3, 'decoration', 'Balloon', '100 balloons decoration to make your experience better', 'This is detail description', 'This is location', 1200, '', 0, '../../../assets/images/customise/3.jpg'),
      new Product(4, 'decoration', 'Cake', 'An egg-less cake with your custom message(1/2kg)', 'This is detail Description', 'This is location.', 700, '', 0, '../../../assets/images/customise/4.jpg'),
      new Product(5, 'decoration', 'Mesage with candles & flower petals', 'A message on ground written candles and flower petals', 'This is detail Description', 'This is locaiton', 800, '', 0, '../../../assets/images/customise/5.jpg')
    ];

    // this.productsService.getProducts().subscribe((data: any) => {
    //   this.allProducts = data;
    this.productsService.getAll().subscribe((data: any) => {
      console.log(data.products);
      data.products.forEach((product: any) => {
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
      });

      console.log(this.allProducts);
      this.allProducts.forEach((product: Product) => {
        if (product.category == "candlelightDinner") {
          this.similarProducts.push(product);
        }
        if (product.id == this.product_id) {
          this.currentProduct = product;
          this.current_rating = parseInt(this.currentProduct.rating);
          console.log(this.currentProduct);
        }
      });
    })


    this.invokeStripe();
  }

  show() {
    this.more_show = !this.more_show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.more_show)
      this.buttonIcon = "fa fa-minus";
    else
      this.buttonIcon = "fa fa-plus";
  }

  toggleAction(e: any) {


    if (e.target.checked) {
      this.icon = "fa fa-plus";
      this.detail_view = true;
    }
    else {
      this.icon = "fa fa-minus";
      this.detail_view = false;
    }
  }

  gotoTop() {
    let el = this.elementRef.nativeElement.querySelector('#reviews');
    el.scrollIntoView({ behavior: 'smooth' });
  }

  addingDecoration(id: number, e: any) {
    if (e.target.checked) {
      this.addedDecorations.push(this.products_customize[id - 1]);
      this.total_price = this.products_customize[id - 1].price + this.total_price;
      this.added_count = this.addedDecorations.length;

      console.log(e.target.checked, id);
    } else {
      this.addedDecorations.forEach((addedDecoration: Product, index) => {
        if (addedDecoration.id == id) {

          this.addedDecorations.splice(index, 1);
          this.total_price = this.total_price - addedDecoration.price;
          this.added_count = this.addedDecorations.length;
          console.log(e.target.checked, id);
        }
      })
    }

    console.log(this.addedDecorations);
  }

  bookingNow() {
    console.log(this.bookdate);
    console.log(this.booktime);
    if(this.bookdate == '' || this.booktime == '') {
      this.isBooking = false;

      alert('Please enter date and time to book!')
    } else {
      this.isBooking = true;
    }
    

  }

  checkout() {
    let currentUser = this.tokenStorage.getUser();
    this.username = currentUser.username;
    this.useremail = currentUser.email;
    console.log(this.username);
    console.log(this.useremail);
    let bookingData = {
      username: this.username,
      useremail: this.useremail,
      total_price: this.total_price + this.currentProduct.price,
      date: this.bookdate,
      time: this.booktime,
      product: this.currentProduct.title,
      location: this.currentProduct.location
    };
    // console.log(this.currentProduct);
    console.log(bookingData);

    if(this.username) {
      this.isCheckout = true;
      this.bookingService.createBooking(bookingData).subscribe((data:any) => {
        console.log(data);
        
        // alert("Successfully booking!");
        
      },
      (err:any) => {
        console.log(err);
      })
      
    } else {
      alert("Please log in!");
      this.isCheckout = false;
      return
    }
  }
  aboutMes = [
    { id: 'facebook', value: 'facebook', label: 'Facebook' },
    { id: 'friend', value: 'friend', label: 'Friend' },
    { id: 'google', value: 'google', label: 'Google' },
    { id: 'instagram', value: 'instagram', label: 'Instagram' },
    { id: 'email', value: 'email', label: 'Email' },
    { id: 'usedBefore', value: 'usedBefore', label: 'Used Before' },
    { id: 'amazon', value: 'amazon', label: 'Amazon' },
    { id: 'other', value: 'other', label: 'Other' }
  ];

  occasions = [
    { id: 'anniversary', value: 'anniversary', label: 'Anniversary' },
    { id: 'partnerBirthday', value: 'partnerBirthday', label: "Partner's Birthday" },
    { id: 'casualOuting', value: 'casualOuting', label: 'Casual Outing' },
    { id: 'myParents', value: 'myParents', label: 'For my Parents' },
    { id: 'myKids', value: 'myKids', label: 'For my kids' },
    { id: 'brotherOrSister', value: 'brotherOrSister', label: 'For Brother or Sister' },
    { id: 'valentine', value: 'valentine', label: "Valentine's" },
    { id: 'karvachauth', value: 'karvachauth', label: 'Karvachauth' },
    { id: 'other1', value: 'other1', label: 'Other' }
  ];

  cards = [
    { id: 'card', title: 'Card', description: 'Visa, MasterCard, RuPay & More', icon: 'fa fa-credit-card' },
    { id: 'qr', title: 'UPI/QR', description: 'Instant payment using UPI App', icon: 'fa fa-qrcode' },
    { id: 'netBanking', title: 'Net Banking', description: 'All Indian Banks', icon: 'fa fa-bank' },
    { id: 'wallet', title: 'Wellet', description: 'PhonePe & More', icon: 'fa fa-google-wallet' },
    { id: 'emi', title: 'EMI', description: 'Cards, EarlySalary & More', icon: 'fa fa-calendar-o' },
    { id: 'payLater', title: 'Pay Later', description: 'ICICI Bank PayLater and FlexiPay by HDFC Bank', icon: 'fa fa-money' }
  ];


  makePayment(amount: number, cardId: string) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IE32rD0vjssTh7xcXSH2HZ5KNI6LEZYhf7kZUZ86TCwgcYNt4ln1f90aYjTPCl2QEfkbKG8M3Tt93sUJMixu8Bh00NYyCjWPy',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }


  gotogallery() {
    this.router.navigate(['/gallery']);
  }

}
