import { Component, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(private location: Location, private tokenStorageService: TokenStorageService) { }

  removeComponent() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (titlee.indexOf("productDetail/") > -1 || titlee.indexOf("help") > -1 || titlee.indexOf("productList/") > -1 || titlee.indexOf("admin") > -1 || titlee.indexOf("mod") > -1 || titlee.indexOf("profile") > -1) {
      return false;
    }
    else {
      return true;
    }
  }

  removeFooter() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if(titlee.indexOf("mod/") > -1 || titlee.indexOf("admin/") > -1) {
      return false;
    }
    else {
      return true;
    }
  }

  scrollToElement($element: Element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  ngOnInit(): void {

  }

}
