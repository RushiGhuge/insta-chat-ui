import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../constants/constant';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: User[] = [];
  roomSelectedUser: User | undefined;
  currentUser: User | undefined;
  subscribtion: Subscription[] = [];

  constructor(public userService: UserService, public store: Store<any>) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    const subscribtion = this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.currentUser = user));
    this.subscribtion.push(subscribtion);
  }

  fetchUserDetails = () => {
    const subscribtion = this.userService
      .getAllUsers()
      .subscribe((users: User[]) => (this.users = users));
    this.subscribtion.push(subscribtion);
  };

  selectUser(user: User): void {
    this.roomSelectedUser = user;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
