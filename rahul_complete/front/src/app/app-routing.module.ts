import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HelpComponent } from './pages/help/help.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'productDetail/:id', component: ProductDetailComponent },
  { path: 'help', component: HelpComponent },
  { path: 'productList/:id', component: ProductListComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import(`./pages/admin/admin.module`).then( m => m.AdminModule) },
  { path: 'mod', canActivate: [AuthGuard], loadChildren: () => import(`./pages/vender/vender.module`).then(m => m.VenderModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
