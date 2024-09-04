import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Conversation, User } from '../../constants/constant';
import { RoomService } from '../../service/room.service';
import { Store } from '@ngrx/store';
import { selectOplineUsersList } from '../../store/user/user.select';
import {
  addMessageToConversation,
  loadConversation,
} from '../../store/conversation/conversation.actions';
import { selectCurrentUserConversation } from '../../store/conversation/conversation.selecters';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  @Input() roomSelectedUser: User | undefined;
  message = '';
  conversation: Conversation | undefined;
  isUserOnline = false;
  Subscribtion$: Subscription[] = [];
  constructor(public roomService: RoomService, public store: Store<any>) {}

  ngOnInit(): void {
    const Subscription2$ = this.store
      .select(selectCurrentUserConversation)
      .subscribe((conversation) => {
        this.conversation = conversation;
      });

    this.Subscribtion$.push(Subscription2$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentUser = changes['roomSelectedUser'].currentValue;
    if (currentUser?._id) {
      const subscribtion = this.roomService
        .getConversation(currentUser._id)
        .subscribe((conversation) => {
          this.conversation = conversation;
          this.store.dispatch(loadConversation({ conversation: conversation }));
        });
      this.Subscribtion$.push(subscribtion);
    }

    const Subscription$ = this.store
      .select(selectOplineUsersList)
      .subscribe((list) => {
        if (this.roomSelectedUser) {
          console.log(list);
          this.isUserOnline = list.includes(this.roomSelectedUser._id);
        }
      });
    this.Subscribtion$.push(Subscription$);
  }

  sendMessage() {
    if (this.roomSelectedUser)
      this.roomService
        .sendMessage(this.roomSelectedUser._id, this.message)
        .subscribe((data) => {
          this.store.dispatch(addMessageToConversation({ conversation: data }));
          this.message = '';
        });
  }

  ngOnDestroy(): void {
    this.Subscribtion$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
