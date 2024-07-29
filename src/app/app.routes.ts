import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { SubmissionListComponent } from './submission/submission-list/submission-list.component';
import { SubmissionViewComponent } from './submission/submission-view/submission-view.component';
import { UserListComponent } from './user/user-list.component';
import { ApplicantListComponent } from './user/applicant-list.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user/:id',
    children: [
      { path: '', component: UserComponent },
    ]
  },
  {
    path: 'app/:id', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'submissions', component: SubmissionListComponent },
      { path: 'submissions/:id', component: SubmissionViewComponent },
      { path: 'users', component: UserListComponent },
      { path: 'applicants', component: ApplicantListComponent },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
