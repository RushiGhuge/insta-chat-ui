import { Component } from '@angular/core';
import { SocketIoService } from './service/socket-io.service';
import { Store } from '@ngrx/store';
import { getCookie } from './auth.guard';
import { loadUser } from './store/user/user.action';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'insta-chat-ui';

  constructor(
    private socketService: SocketIoService,
    private store: Store<any>
  ) {
    const token = getCookie('jwt');
    if(token) {
      let data = jwtDecode<any>(token ?? '');
      console.log(data);
      this.store.dispatch(loadUser({ user: data }));
    }
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
