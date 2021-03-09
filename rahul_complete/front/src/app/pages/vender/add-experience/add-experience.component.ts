import { Component, OnInit } from '@angular/core';
import { Experience } from '../../../model/experience';
import { VenderService } from '../../../service/vender.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenStorageService } from '../../../service/token-storage.service';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  userName: string = '';
  userrole: string = '';
  experience: Experience = {
    username: '',
    userrole: '',
    title: '',
    category: '',
    shortDes: '',
    detailDes: '',
    location: '',
    price: 0,
    reviews: '',
    rating: 0,
    img1: '',
    published: false
  }

  submitted = false;

  cates: any = [];
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos: any;
  baseUrl: string = 'http://localhost:8080/api/files/';
  imageUrl?: string;

  constructor(private venderService: VenderService, private router: Router, private tokenStorage: TokenStorageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fileInfos = [];
    let currentUser = this.tokenStorage.getUser();
    this.userName = currentUser.username;
    this.userrole = currentUser.roles[0];
    this.categoryService.getCategoriesAll().subscribe(
      (response:any) => {
        
        response.forEach((cate: any, index:number) => {
          this.cates.push({id: cate.category_id, category_name:cate.parent_id+"/"+cate.subMenu_id+"/"+cate.category_name});
        })
      },
      (error:any) => {
        console.log(error);
      }
    );
    
    
  }

  saveExperience(): void {
    const data = {
      userName: this.userName,
      userRole: this.userrole,
      title: this.experience.title,
      category: this.experience.category,
      shortDes: this.experience.shortDes,
      detailDes: this.experience.detailDes,
      location: this.experience.location,
      price: this.experience.price,
      reviews: this.experience.reviews,
      rating: this.experience.rating,
      img1: this.imageUrl
    };

    
    this.venderService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        alert("Experience was submitted successfully!");
        this.newExperience();
      },
      error => {
        console.log(error);
      }
    );
  }

  newExperience(): void {
    this.submitted = false;
    this.experience = {
      title: '',
      category: '',
      shortDes: '',
      detailDes: '',
      location: '',
      price: 0,
      reviews: '',
      rating: 0,
      img1: '',
      published: false
    }
    this.fileInfos =[];
    this.selectFiles(event);
  }

  cancel(): void {

    this.router.navigateByUrl("/mod/experiences");
  }

  //selecting files
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  //uploading selected files
  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  //upload method
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.imageUrl = '';
    if (file) {
      this.venderService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.fileInfos.push({name: file.name, url: this.baseUrl+file.name});
            this.imageUrl = this.imageUrl + file.name + ":";
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.fileInfos.push(file.name);
        });
    }
  }
}
