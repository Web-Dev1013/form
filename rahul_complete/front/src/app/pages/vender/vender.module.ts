import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ExperiencesComponent } from './experiences/experiences.component';
import { ExperienceDetailComponent } from './experience-detail/experience-detail.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', redirectTo: 'experiences', pathMatch: 'full'},
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'experience/:id', component: ExperienceDetailComponent },
  { path: 'add', component: AddExperienceComponent }
];

@NgModule({
  declarations: [ExperiencesComponent, ExperienceDetailComponent, AddExperienceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VenderModule { }
