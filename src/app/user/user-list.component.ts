import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDetailResponse, UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public users: Array<UserDetailResponse> = [];
  public errorMessage = '';
  private userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.userId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(data => {
          this.users = data;
        },
        err => this.errorMessage = err.error.message)
  }

  goToDetails(userId: string) {
    this.router.navigate([`app/${this.userId}/users/${userId}`]);
  }
}
