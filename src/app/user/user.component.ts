import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RequestComponent } from './request.component';
import { UserDetailResponse, UserService } from './user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RequestComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public user: UserDetailResponse;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    let userId = this.route.snapshot.params['id'];
    this.userService.getAllUsers()
      .subscribe(response => {
        this.user = <UserDetailResponse>response.find(user => user.id === userId);
      })
  }

}
