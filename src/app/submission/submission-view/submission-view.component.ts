import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

import { SubmissionService } from '../submission.service';
import { Status, SubmissionResponse } from '../model/submission.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-submission-view',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './submission-view.component.html',
  styleUrl: './submission-view.component.css'
})
export class SubmissionViewComponent {

  public submission: SubmissionResponse;
  private id: string

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.submissionService.getSubmission(this.id)
      .subscribe(response => {
        this.submission = response;
      })
  }

  updateStatus(status: Status) {
    this.submissionService.updateSubmission(this.id, status)
      .subscribe(response => {
        this.submission = response;
      })
  }

  getLicenseDescription(licenseType: string) {
    return this.submissionService.licenseTypes.find(type => type.id = licenseType)?.description;
  }

  public readonly Status = Status;
}
