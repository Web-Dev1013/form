import { Component, OnInit } from '@angular/core';
import { VenderService } from '../../../service/vender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from '../../../model/experience';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenStorageService } from '../../../service/token-storage.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {

  currentExperience: Experience = {
    title: '',
    category: '',
    shortDes: '',
    detailDes: '',
    location: '',
    price: 0,
    img1: '',
    published: false
  };

  userRole: string = '';
  message = "";
  imageUrl?: string;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message1: string[] = [];

  fileInfos: any[]=[];
  baseUrl: string = 'http://localhost:8080/api/files/';
  

  constructor( private venderService: VenderService, private route: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.message = '';
    this.getExperience(this.route.snapshot.params.id);
    this.userRole = this.tokenStorage.getUser().roles[0];

  }

  getExperience(id: string): void {
    this.fileInfos = [];
    this.venderService.get(id).subscribe(
      (data:any) => {
        this.currentExperience = data;
        let fileNames = data.img1.split(":");
        for(let i=0; i<fileNames.length-1; i++ ) {
          this.fileInfos.push({name: fileNames[i], url: this.baseUrl+fileNames[i]});
          // this.imageUrl = this.imageUrl + fileNames[i] + ":";
        };
        // console.log(this.currentExperience);
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data ={
      title: this.currentExperience.title,
      category: this.currentExperience.category,
      shortDes: this.currentExperience.shortDes,
      detailDes: this.currentExperience.detailDes,
      location: this.currentExperience.location,
      price: this.currentExperience.price,
      img1: this.imageUrl,
      published: status
    };

    this.venderService.update(this.currentExperience.id, data).subscribe(
      (responsive:any) => {
        this.currentExperience.published = status;
        console.log(responsive);
        this.message = responsive.message;
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  updateExperience(): void {
    this.venderService.update(this.currentExperience.id, this.currentExperience).subscribe(
      response => {
        console.log(response);
        this.message = response.message;
        this.router.navigateByUrl("/mod/experiences");
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteExperience(): void {
    this.venderService.delete(this.currentExperience.id).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl('/mod/experiences');
      },
      errors => {
        console.log(errors);
      }
    );
  }

  //selecting files
  selectFiles(event: any): void {
    this.message1 = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  //uploading selected files
  uploadFiles(): void {
    this.message1 = [];

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
    this.fileInfos = [];
    if (file) {
      this.venderService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message1.push(msg);
            this.fileInfos.push({name: file.name, url: this.baseUrl+file.name});
            this.imageUrl = this.imageUrl + file.name + ":";
            this.currentExperience.img1 = this.imageUrl;
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message1.push(msg);
          this.fileInfos.push(file.name);
        });
    }
  }


}
