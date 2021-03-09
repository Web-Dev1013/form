import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../../service/token-storage.service";
import { User } from '../../model/user';
import { ProfileService } from '../../service/profile.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = {
    username: '',
    email: '',
    role: '',
    status: '',
    sex: '',
    birthday: '',
    city:'',
    street:'',
    job:'',
    phone:'',
    currentPass:'',
    newPass: ''
  };

  constructor(private token: TokenStorageService, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    let user = this.token.getUser();
    this.profileService.getUser(user.username).subscribe((data: any) => {
      console.log(data);
      this.currentUser = data;
    })
  }

  updateUser() {
    let user = {
      sex: this.currentUser.sex,
      birthday: this.currentUser.birthday,
      city: this.currentUser.city,
      street: this.currentUser.street,
      job: this.currentUser.job,
      phone: this.currentUser.phone
    };
    console.log(user);
    this.profileService.updateUser(this.currentUser.username, user).subscribe((data:any) => {
      console.log(data);
      alert(data.message);
    },
    (err:any) => {
      console.log(err);
    })
  }

  updatePassword() {
    let user = {
      newPass: this.currentUser.newPass,
      currentPass: this.currentUser.currentPass
    }
    this.authService.updatePassword(this.currentUser.username, user).subscribe((data:any) => {
      alert(data.message);
    },
    (err:any) => {
      alert(err.error.message)
      console.log(err);
    })
  }
}
