import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { LocalStorageService } from '../../auth/local-storage.service';
import { SubmissionService } from '../submission.service';
import { SubmissionResponse } from '../model/submission.model';

@Component({
  selector: 'app-submission-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './submission-add.component.html',
  styleUrl: './submission-add.component.css'
})
export class SubmissionAddComponent implements AfterViewInit {

  @Input({required: true}) public applicantId: string = '';
  @Output() public create: EventEmitter<SubmissionResponse> = new EventEmitter<SubmissionResponse>();

  public submissionForm: FormGroup;
  public error = '';
  public licenseTypes = [
    { id: 'A', description: 'Commercial driver\'s license for heavy vehicles, including trucks and buses' },
    { id: 'B', description: 'Commercial driver\'s license for medium vehicles, typically excluding heavy trailers' },
    { id: 'C', description: 'Standard driver\'s license for personal vehicles, including cars and vans' },
    { id: 'D', description: 'Motorcycle license for operating two-wheeled vehicles' },
    { id: 'LP', description: 'A provisional license allowing new drivers to practice under supervision' },
    { id: 'IDP', description: 'Allows a driver to operate a vehicle in foreign countries' },
    { id: 'SL', description: 'For specific vehicle types, such as school buses or emergency vehicles' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private storageService: LocalStorageService,
    private submissionService: SubmissionService,
    private cd: ChangeDetectorRef,
  ) {
    this.submissionForm = this.formBuilder.group({
      applicantId: this.applicantId,
      licenseType: ['', Validators.required],
      applicationDate: new Date(),
      remarks: ''
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }


  submit() {
    this.error = '';
    this.submissionForm.value.applicantId = this.applicantId;
    this.submissionForm.value.applicationDate = new Date()
    this.submissionService.addSubmission(this.submissionForm.value)
      .subscribe(response => {
          debugger
          // let submissionResponse = response as SubmissionResponse;
          this.create.emit(response);
        },
        error => this.error = error.error.message
      );
  }
}
