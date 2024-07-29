import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../auth/local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly headers = {};

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    let accessToken = this.storageService.get('accessToken');
    this.headers = {'Authorization': `Bearer ${accessToken}`}
  }

  private readonly users_url = '/api/v1/users';
  private readonly applicants_url = '/api/v1/applicants';

  public getUser(id: string): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`${this.users_url}/${id}`, { headers: this.headers });
  }

  public getAllUsers(): Observable<Array<UserDetailResponse>> {
    return this.http.get<Array<UserDetailResponse>>(this.users_url, { headers: this.headers });
  }

  public getAllApplicants(): Observable<Array<ApplicantResponse>> {
    return this.http.get<Array<ApplicantResponse>>(this.applicants_url, { headers: this.headers });
  }

  public addApplicant(applicantRequest: ApplicantRequest): Observable<ApplicantResponse> {
    return this.http.post<ApplicantResponse>(this.applicants_url, applicantRequest, { headers: this.headers });
  }
}

export interface ApplicantRequest {
  userId: string;
  dob: string;
  remarks: string
}

export interface ApplicantResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  remarks: string
}

export interface UserDetailResponse {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  roles: [
    string
  ],
  verified: true
}
