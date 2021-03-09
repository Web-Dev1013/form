import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CarouselComponent } from './common/carousel/carousel.component';
import { BackgroundComponent } from './common/background/background.component';
import { FashionCategoryComponent } from './common/fashion-category/fashion-category.component';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HelpComponent } from './pages/help/help.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardAdminComponent } from './pages/admin/board-admin/board-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    BackgroundComponent,
    FashionCategoryComponent,
    MainComponent,
    FooterComponent,
    ProductDetailComponent,
    HelpComponent,
    ProductListComponent,
    ProfileComponent,
    BoardAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxPaginationModule,
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
