import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { LocalStorageService } from '../auth/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup;
  public error = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: LocalStorageService
  ) {
    this.storageService.remove('accessToken');
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  login() {
    this.error = '';
    this.http.post('/api/v1/auth/login', this.loginForm.value)
      .subscribe(response => {
          let loginResponse = response as LoginResponse;
          this.storageService.set('accessToken', loginResponse.accessToken);
          if (loginResponse.roles.includes('ROLE_ADMIN')) {
            this.router.navigate([`app/${loginResponse.userId}`]);
          } else {
            this.router.navigate([`user/${loginResponse.userId}`]);
          }
        },
        error => this.error = error.error.message
      );
  }
}

export interface LoginResponse {
  accessToken: string;
  type: string;
  userId: string;
  username: string;
  roles: string[];
}
