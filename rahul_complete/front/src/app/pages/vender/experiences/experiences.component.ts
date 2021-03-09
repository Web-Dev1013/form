import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from '../../../model/experience';
import { VenderService } from '../../../service/vender.service';
import { TokenStorageService } from '../../../service/token-storage.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  
  userName: string = "";
  userRole: string = '';

  base_url = "http://localhost:8080/api/files/"
  experiences: Experience[] = [];
  currentExperience: Experience = {};
  currentIndex = -1;
  title = '';
  related_imgs: any[] = [];

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private venderService: VenderService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
    this.currentExperience = {};
    let currentUser = this.tokenStorage.getUser();
    this.userName = currentUser.username;
    this.userRole = currentUser.roles[0];
    this.retrieveExperiences();
    console.log(this.userRole);
  }

  getRequestParams( userName: any, userRole: any, searchTitle: any, page: any, pageSize: any): any {
    // tslint:disable-next-line:prefer-const
    let params: any ={};
    if(userName) {
      params[`userName`] = userName;
    }
    if(userRole) {
      params[`userRole`] = userRole;
    }
    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrieveExperiences(): void {
    
    const params = this.getRequestParams(this.userName, this.userRole, this.title, this.page, this.pageSize);
    console.log(params);
    
    this.venderService.getAll(params)
      .subscribe(
        (response:any) => {
          console.log(response);
          // const { experiences, totalItems } = response;
          this.experiences = response.experiences;
          this.count = response.totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  };

  handlePageChange(event:any): void {
    this.page = event;
    this.retrieveExperiences();
  }

  handlePageSizeChange(event:any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveExperiences();
  }

  refreshList(): void {
    this.retrieveExperiences();
    this.currentExperience = {};
    this.currentIndex = -1;
  }

  setActiveExperience(experience: any, index: number): void {
    this.currentIndex = index;
    this.currentExperience = experience;
    let images = experience.img1.split(":");
    // console.log(experience.img1);
    // console.log(images);
    this.related_imgs = [];
    for( let i=0; i<images.length-1; i++) {
      this.related_imgs.push({name: images[i], url: this.base_url+images[i]});
    }

  }

  removeAllExperiences(): void {
    if (confirm("Really, you will delete everything?")) {
      this.venderService.deleteAll().subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      console.log('Nothing!');
    }
  }

  searchTitle(event:any): void {
    this.title = event.target.value;
    this.venderService.findByTitle(this.userName, this.userRole, event.target.value).subscribe(
      (data:any) => {
        this.experiences = data.experiences;
        console.log(data);
        console.log(this.title);
      },
      error => {
        console.log(error);
      }
    );
  }

  addExperience():void {
    this.router.navigateByUrl("/mod/add");
  }
}
