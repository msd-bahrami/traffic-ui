import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionAddComponent } from './submission-add.component';

describe('SubmissionAddComponent', () => {
  let component: SubmissionAddComponent;
  let fixture: ComponentFixture<SubmissionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
