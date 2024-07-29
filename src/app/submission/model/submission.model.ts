export interface SubmissionRequest {
  applicantId: string;
  licenseType: string;
  applicationDate: string;
  remarks: string
}

export interface SubmissionResponse {
  id: string;
  applicant: Applicant;
  licenseType: string;
  status: Status;
  applicationDate: string;
  remarks: string
}

export interface Applicant {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  remarks: string
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  AWAITING_DOCUMENTS = 'AWAITING_DOCUMENTS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

