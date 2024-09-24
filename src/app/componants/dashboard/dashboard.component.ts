import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../constants/constant';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.select';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { loadUser } from '../../store/user/user.action';
import { SocketIoService } from '../../service/socket-io.service';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: User[] = [];
  roomSelectedUser: User | undefined;
  currentUser: User | undefined;
  subscription: Subscription[] = [];

  constructor(
    public userService: UserService,
    public store: Store<any>,
    public socketService: SocketIoService,
    public authService: AuthService,

    public router: Router
  ) {
    const token = localStorage.getItem('authToken');

    if (token) {
      let data = jwtDecode<any>(token ?? '');
      this.store.dispatch(loadUser({ user: data }));
    }
  }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    this.fetchUserDetails();
    const subscription = this.store
      .pipe(select(selectUser))
      .subscribe((user) => (this.currentUser = user));
    this.subscription.push(subscription);
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  fetchUserDetails = () => {
    const subscription = this.userService
      .getAllUsers()
      .subscribe((users: User[]) => (this.users = users));
    this.subscription.push(subscription);
  };

  selectUser(user: User): void {
    this.roomSelectedUser = user;
  }

  private handleBeforeUnload(event: BeforeUnloadEvent): void {
    this.socketService.disconnect(); // Disconnect from WebSocket
  }

  private handleOffline(): void {
    console.warn('User is offline');
    this.socketService.disconnect(); // Disconnect from the WebSocket
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      'beforeunload',
      this.handleBeforeUnload.bind(this)
    );
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
    window.removeEventListener('offline', this.handleOffline.bind(this));
  }
}
