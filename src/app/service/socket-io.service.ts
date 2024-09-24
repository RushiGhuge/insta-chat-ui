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
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  // private socketIo: socketIo.Socket;
  socket: socketIo.Socket | undefined;
  user: BasicUser | undefined;
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<any>,
    public noti: NotificationService,
    private snackbarService: SnackbarService
  ) {
    const subscription = this.store
      .pipe(select(selectUser))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.push(subscription);
  }

  setupSocketConnection() {
    this.socket = socketIo.io(CHAT_BACKEND_URL, {
      transports: ['websocket'],
      query: {
        userId: this.user?._id,
      },
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnections
      reconnectionDelayMax: 5000, // Maximum delay between reconnections
      upgrade: false,
    });
    this.socket.on('getOnlineUsers', (users) => {
      if (users) {
        console.log(users);
        this.store.dispatch(setOnlineUsers({ users: users }));
      }
    });
    this.socket.on('chatMessage', (message) => {
      this.store
        .select(selectCurrentUserConversation)
        .pipe(take(1))
        .subscribe((conversation) => {
          if (conversation._id === message.content.conversationId) {
            this.store.dispatch(
              addMessageToConversation({ conversation: message.content })
            );
            this.noti.playReceivesNotification();
          } else {
            this.noti.playReceivesNotification();
            this.snackbarService.show(
              `${message.content.senderName ?? 'New Message'} : ${
                message.content.message
              }`
            );
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
    this.disconnect();
    this.socket?.off('message');
  }
}
