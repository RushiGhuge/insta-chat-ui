import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { BASE_URL, CHAT_BACKEND_URL } from '../constants/env.constants';
import { select, Store } from '@ngrx/store';
import { BasicUser } from '../constants/constant';
import { selectUser } from '../store/user/user.select';
import { Subscription, take } from 'rxjs';
import { setOnlineUsers } from '../store/user/user.action';
import { addMessageToConversation } from '../store/conversation/conversation.actions';
import { selectCurrentUserConversation } from '../store/conversation/conversation.selecters';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  // private socketIo: socketIo.Socket;
  socket: socketIo.Socket | undefined;
  user: BasicUser | undefined;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<any>, public noti: NotificationService) {
    const subscription = this.store
      .pipe(select(selectUser))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.push(subscription);
  }

  setupSocketConnection() {
    this.socket = socketIo.io(CHAT_BACKEND_URL, {
      transports: ['websocket', 'polling'],
      query: {
        userId: this.user?._id,
      },
    });
    this.socket.on('getOnlineUsers', (users) => {
      if (users) {
        this.store.dispatch(setOnlineUsers({ users: users }));
      }
    });
    this.socket.on('chatMessage', (message) => {
      // console.log(message);
      this.store
        .select(selectCurrentUserConversation)
        .pipe(take(1))
        .subscribe((conversation) => {
          if (conversation._id === message.content.conversationId) {
            this.store.dispatch(
              addMessageToConversation({ conversation: message.content })
            );
            this.noti.playReceivesNotification();
          }
        });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.socket?.off('message');
  }
}
