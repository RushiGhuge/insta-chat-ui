import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Conversation, User } from '../../constants/constant';
import { RoomService } from '../../service/room.service';
import { Store } from '@ngrx/store';
import { selectOplineUsersList } from '../../store/user/user.select';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  @Input() roomSelectedUser: User | undefined;
  message = '';
  conversations: Conversation[] = [];
  isUserOnline = false;

  constructor(public roomService: RoomService, public store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(selectOplineUsersList).subscribe((list) => {
      if (this.roomSelectedUser)
        this.isUserOnline = list.includes(this.roomSelectedUser._id);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentUser = changes['roomSelectedUser'].currentValue;
    if (currentUser?._id) {
      this.roomService
        .getConversation(currentUser._id)
        .subscribe((conversation) => {
          this.conversations = conversation;
        });
    }
  }

  sendMessage() {
    if (this.roomSelectedUser)
      this.roomService
        .sendMessage(this.roomSelectedUser._id, this.message)
        .subscribe((data) => {
          console.log(data);
          this.message = '';
        });
  }
}
