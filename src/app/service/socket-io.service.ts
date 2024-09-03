import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { BASE_URL } from '../constants/env.constants';
import { select, Store } from '@ngrx/store';
import { BasicUser } from '../constants/constant';
import { selectUser } from '../store/user/user.select';
import { Subscription } from 'rxjs';
import { setOnlineUsers } from '../store/user/user.action';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  // private socketIo: socketIo.Socket;
  socket: socketIo.Socket | undefined;
  user: BasicUser | undefined;
  subsctiptions: Subscription[] = [];
  constructor(private store: Store<any>) {
    const subscription = this.store
      .pipe(select(selectUser))
      .subscribe((user) => {
        this.user = user;
      });
    this.subsctiptions.push(subscription);
  }

  setupSocketConnection() {
    this.socket = socketIo.io(BASE_URL, {
      query: {
        userId: this.user?._id,
      },
    });
    this.socket.on('getOnlineUsers', (users) => {
      if (users) {
        this.store.dispatch(setOnlineUsers({ users: users }));
      }
    });
    this.socket.on('message', (message) => {
      console.log(message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
