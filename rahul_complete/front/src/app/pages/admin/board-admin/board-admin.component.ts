import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AdminService } from '../../../service/admin.service';
import { User } from '../../../model/user';

@Component({ 
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: User[] = [];
  currentUser: any;
  message?: string
  searchTitle?: string;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    // this.userService.getAdminBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
    this.retrieveUsers();
    
  }

  getRequestParams( searchTitle: any, page: any, pageSize: any): any {
    // tslint:disable-next-line:prefer-const
    let params: any ={};
    
    if (searchTitle) {
      params[`searchTitle`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveUsers(): void {
    const params = this.getRequestParams(this.searchTitle, this.page, this.pageSize);

    this.adminService.getAll(params)
      .subscribe(
        (response:any) => {
          console.log(response);
          // const { users, totalItems } = response;
          this.users = response.users;
          this.count = response.totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event:any): void {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }


  setActiveUser(user: any, index: number): void {
    this.currentIndex = index;
    this.currentUser = user;
    
    console.log(this.currentUser);
  }

  searchUser(event:any): void {
    this.searchTitle = event.target.value;
    this.adminService.findByTitle(event.target.value).subscribe(
      (data:any) => {
        this.users = data.users;
        console.log(data);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data ={
      username: this.currentUser.username,
      email: this.currentUser.email,
      
      status: status
    };

    this.adminService.update(this.currentUser.id, data).subscribe(
      (responsive:any) => {
        this.currentUser.status = status;
        console.log(responsive);
        this.message = responsive.message;
      },
      (error:any) => {
        console.log(error);
      }
    );
  }
}
