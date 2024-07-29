import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserDetailResponse, UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public userId: string;
  public user: UserDetailResponse;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.userService.getAllUsers()
      .subscribe(response => {
        this.user = <UserDetailResponse>response.find(user => user.id === this.userId);
      })
  }

}
