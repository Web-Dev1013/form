import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../service/booking.service';
import { Booking } from '../../../model/booking';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {

  bookings: Booking[] = [];
  location = '';

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.retrieveBookings();
  }
  
  searchLocation(event:any): void {
    this.location = event.target.value;
    this.bookingService.findByLocation(event.target.value).subscribe(
      (data:any) => {
        this.bookings = data.bookings;
        console.log(data);
        console.log(this.location);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  getRequestParams(searchLocation: any, page: any, pageSize: any): any {
    // tslint:disable-next-line:prefer-const
    let params: any ={};
    
    if (searchLocation) {
      params[`title`] = searchLocation;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrieveBookings(): void {
    
    const params = this.getRequestParams(this.searchLocation, this.page, this.pageSize);
    console.log(params);
    
    this.bookingService.findBooking(params)
      .subscribe(
        (response:any) => {
          console.log(response);
          // const { experiences, totalItems } = response;
          this.bookings = response.bookings;
          this.count = response.totalItems;
          console.log(response);
        },
        (error:any) => {
          console.log(error);
        });
  };
  handlePageChange(event:any): void {
    this.page = event;
    this.retrieveBookings();
  }

  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBookings();
  }
}
