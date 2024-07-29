import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicantResponse, UserService } from './user.service';

@Component({
  selector: 'app-applicant-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './applicant-list.component.html',
  styleUrl: './applicant-list.component.css'
})
export class ApplicantListComponent implements OnInit {

  public applicants: Array<ApplicantResponse> = [];
  public errorMessage = '';
  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.userId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getAllApplicants()
      .subscribe(response => {
          this.applicants = response;
        },
        err => this.errorMessage = err.error.message)
  }

  goToDetails(applicantId: string) {
    this.router.navigate([`app/${this.userId}/applicants/${applicantId}`]);
  }
}
