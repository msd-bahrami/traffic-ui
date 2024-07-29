import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApplicantRequest, ApplicantResponse, UserDetailResponse, UserService } from './user.service';
import { SubmissionAddComponent } from '../submission/submission-add/submission-add.component';
import { SubmissionService } from '../submission/submission.service';
import { Status, SubmissionResponse } from '../submission/model/submission.model';
import { SubmissionViewComponent } from '../submission/submission-view/submission-view.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    SubmissionAddComponent,
    MatFormField,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    NgStyle,
    NgForOf,
    FormsModule,
    SubmissionViewComponent,
    NgIf,
    DatePipe,
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements AfterViewInit {

  @Input({required: true}) public user: UserDetailResponse;

  public licenseTypes = [
    {id: 'A', description: 'Commercial driver\'s license for heavy vehicles, including trucks and buses'},
    {id: 'B', description: 'Commercial driver\'s license for medium vehicles, typically excluding heavy trailers'},
    {id: 'C', description: 'Standard driver\'s license for personal vehicles, including cars and vans'},
    {id: 'D', description: 'Motorcycle license for operating two-wheeled vehicles'},
    {id: 'LP', description: 'A provisional license allowing new drivers to practice under supervision'},
    {id: 'IDP', description: 'Allows a driver to operate a vehicle in foreign countries'},
    {id: 'SL', description: 'For specific vehicle types, such as school buses or emergency vehicles'}
  ]

  stepperOrientation: Observable<StepperOrientation>;
  stepperIndex = 0;
  step = false;

  public errorMessage: '';
  public licenseType: string;
  public remarks: '';
  public submission: SubmissionResponse;
  public applicant: ApplicantResponse;

  constructor(
    private cd: ChangeDetectorRef,
    breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private submissionService: SubmissionService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  ngAfterViewInit(): void {
    this.loadApplicant();
  }

  createSubmission() {
    this.errorMessage = '';
    this.submissionService.addSubmission({
      applicantId: this.applicant.id,
      licenseType: this.licenseType,
      applicationDate: new Date().toISOString(),
      remarks: this.remarks
    })
      .subscribe(response => {
          this.submission = response;
          this.setupStepper();
        },
        error => {
          this.errorMessage = error.error.error;
        }
      );
  }

  private loadApplicant() {
    this.userService.getAllApplicants()
      .subscribe(response => {
        let find = response.find(applicant => applicant.username === this.user.username);
        if (find) {
          this.applicant = find;
          this.loadSubmission();
        } else {
          this.createApplicant();
        }
      }, error => this.createApplicant())
  }

  private createApplicant() {
    let request: ApplicantRequest = {
      userId: this.user.id,
      dob: '2000-07-25T15:35:25.487Z',
      remarks: ''
    };
    this.userService.addApplicant(request)
      .subscribe(response => {
        this.applicant = response;
      });
  }

  private loadSubmission() {
    this.submissionService.getAllSubmissions()
      .subscribe(response => {
        let find = response.find(submission => submission.applicant.id === this.applicant.id);
        if (find) {
          this.submission = find;
          this.setupStepper();
        }
      })
  }

  private setupStepper() {
    let index = 0;
    switch (this.submission.status) {
      case Status.PENDING: {
        index = 1;
        break;
      }
      case Status.AWAITING_DOCUMENTS: {
        index = 2;
        break;
      }
      case Status.UNDER_REVIEW: {
        index = 3;
        break;
      }
      case Status.REJECTED: {
        index = 4;
        break;
      }
      case Status.APPROVED: {
        index = 4;
        break;
      }
      case Status.COMPLETED: {
        index = 5;
        break;
      }
    }

    this.step = true;
    setTimeout(() => {
      this.stepperIndex = index;
      this.step = false
    }, 1);
  }

  protected readonly Status = Status;

  getLicenseDescription(licenseType: string) {
    return this.licenseTypes.find(type => type.id = licenseType)?.description;
  }
}
