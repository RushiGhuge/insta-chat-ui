import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Conversation, User } from '../../constants/constant';
import { RoomService } from '../../service/room.service';
import { Store } from '@ngrx/store';
import { selectOplineUsersList as selectOnlineUsersList } from '../../store/user/user.select';
import {
  addMessageToConversation,
  loadConversation,
} from '../../store/conversation/conversation.actions';
import { selectCurrentUserConversation } from '../../store/conversation/conversation.selecters';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  @Input() roomSelectedUser: User | undefined;
  message = '';
  conversation: Conversation | undefined;
  userConversationId: string | undefined;
  isUserOnline = false;
  Subscription$: Subscription[] = [];
  constructor(
    public roomService: RoomService,
    public store: Store<any>,
    public notify: NotificationService
  ) {}

  ngOnInit(): void {
    const Subscription2$ = this.store
      .select(selectCurrentUserConversation)
      .subscribe((conversation) => {
        this.conversation = conversation;
      });
    this.Subscription$.push(Subscription2$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentUser = changes['roomSelectedUser'].currentValue;
    if (currentUser?._id) {
      this.getCachedConversation(currentUser._id);
      const subscription = this.roomService
        .getConversation(currentUser._id)
        .subscribe((conversation) => {
          this.conversation = conversation;
          this.store.dispatch(loadConversation({ conversation: conversation }));
        });
      this.Subscription$.push(subscription);
    }

    const Subscription$ = this.store
      .select(selectOnlineUsersList)
      .subscribe((list) => {
        if (this.roomSelectedUser) {
          this.isUserOnline = list.includes(this.roomSelectedUser._id);
        }
      });
    this.Subscription$.push(Subscription$);
  }

  getCachedConversation(id: string) {
    if (id === '') return;
    const subscription = this.roomService
      .getConversationCached(id)
      .subscribe((conversation) => {
        this.conversation = conversation;
        this.store.dispatch(loadConversation({ conversation: conversation }));
      });
    this.Subscription$.push(subscription);
  }

  sendMessage() {
    let newDate = new Date();
    const data = {
      conversationId: '',
      createdAt: newDate.toString(),
      message: this.message,
      receiverId: this.roomSelectedUser?._id ?? '',
      senderId: '',
      updatedAt: newDate.toString(),
      __v: 0,
      _id: '',
    };
    this.store.dispatch(addMessageToConversation({ conversation: data }));
    if (this.roomSelectedUser){
      this.roomService.sendMessage(this.roomSelectedUser._id, this.message).subscribe();
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.Subscription$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
