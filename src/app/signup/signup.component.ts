import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public signupForm: FormGroup;
  public error = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      apartment: '',
      postcode: '',
      country: '',
      phone: '',
      state: '',
      city: '',
      civilNumber: '',
    });
  }

  signup() {
    this.error = '';
    this.signupForm.value.role = ['ROLE_USER'];
    this.http.post('/api/v1/auth/signup', this.signupForm.value)
      .subscribe(response => {
          this.router.navigate(['/login']);
        },
        error => this.error = error.error.message ? error.error.message : error.error.error
      );
  }
}
