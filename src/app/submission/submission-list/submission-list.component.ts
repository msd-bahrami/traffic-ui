import { Component, OnInit } from '@angular/core';

import { SubmissionService } from '../submission.service';
import { SubmissionResponse } from '../model/submission.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './submission-list.component.html',
  styleUrl: './submission-list.component.css'
})
export class SubmissionListComponent implements OnInit {

  public submissions: Array<SubmissionResponse> = [];
  public errorMessage = '';
  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private submissionService: SubmissionService,
  ) {
    this.userId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.submissionService.getAllSubmissions()
      .subscribe(data => {
          this.submissions = data;
        },
        err => this.errorMessage = err.error.message)
  }

  goToDetails(submissionId: string) {
    this.router.navigate([`app/${this.userId}/submissions/${submissionId}`]);
  }
}
