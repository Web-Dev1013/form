import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AdminComponent } from './admin.component';
import { CategroyComponent } from "../admin/categroy/categroy.component";
import { BookingManagementComponent } from './booking-management/booking-management.component';

const routes: Routes =[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: AdminComponent, children: [
    {path: '', redirectTo: 'userManager', pathMatch: 'full'},
    {path: 'userManager', component: BoardAdminComponent },
    {path: 'category', component: CategroyComponent },
    {path: 'booking', component: BookingManagementComponent }
  ] },
  
]
@NgModule({
  declarations: [AdminComponent, CategroyComponent, BookingManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ]
})
export class AdminModule { }
