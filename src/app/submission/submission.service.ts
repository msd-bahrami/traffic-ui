import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Status, SubmissionRequest, SubmissionResponse } from './model/submission.model';
import { LocalStorageService } from '../auth/local-storage.service';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  public licenseTypes = [
    {id: 'A', description: 'Commercial driver\'s license for heavy vehicles, including trucks and buses'},
    {id: 'B', description: 'Commercial driver\'s license for medium vehicles, typically excluding heavy trailers'},
    {id: 'C', description: 'Standard driver\'s license for personal vehicles, including cars and vans'},
    {id: 'D', description: 'Motorcycle license for operating two-wheeled vehicles'},
    {id: 'LP', description: 'A provisional license allowing new drivers to practice under supervision'},
    {id: 'IDP', description: 'Allows a driver to operate a vehicle in foreign countries'},
    {id: 'SL', description: 'For specific vehicle types, such as school buses or emergency vehicles'}
  ];
  private readonly headers = {};

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    let accessToken = this.storageService.get('accessToken');
    this.headers = {'Authorization': `Bearer ${accessToken}`}
  }

  private readonly submission_url = '/api/v1/applications';

  public getAllSubmissions(): Observable<Array<SubmissionResponse>> {
    return this.http.get<Array<SubmissionResponse>>(this.submission_url, { headers: this.headers });
  }

  public getSubmission(id: string): Observable<SubmissionResponse> {
    return this.http.get<SubmissionResponse>(`${this.submission_url}/${id}`, { headers: this.headers });
  }

  public addSubmission(submissionRequest: SubmissionRequest): Observable<SubmissionResponse> {
    return this.http.post<SubmissionResponse>(this.submission_url, submissionRequest, { headers: this.headers });
  }

  public updateSubmission(id: string, status: Status): Observable<SubmissionResponse> {
    return this.http.put<SubmissionResponse>(`${this.submission_url}/${id}/status?status=${Status[status]}`, null,{ headers: this.headers });
  }
}
