import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../constants/constant';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: User[] = [];
  roomSelectedUser: User | undefined;
  currentUser: User | undefined;
  constructor(public userService: UserService, public store: Store<any>) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.currentUser = user));
  }

  fetchUserDetails = () => {
    this.userService
      .getAllUsers()
      .subscribe((users: User[]) => (this.users = users));
  };

  selectUser(user: User): void {
    this.roomSelectedUser = user;
  }
}
