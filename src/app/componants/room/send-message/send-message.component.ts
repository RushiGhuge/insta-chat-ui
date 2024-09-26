import { Component, Input } from '@angular/core';
import { RoomService } from '../../../service/room.service';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../service/notification.service';
import { addMessageToConversation } from '../../../store/conversation/conversation.actions';
import { User } from '../../../constants/constant';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
})
export class SendMessageComponent {
  @Input() roomSelectedUser: User | undefined;
  message = '';
  showEmojiPicker = false;
  constructor(
    public roomService: RoomService,
    public store: Store<any>,
    public notify: NotificationService
  ) {}

  addEmoji(event: any) {
    this.message = this.message.concat(event.emoji.native);
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
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
    console.log(this.message);

    if (this.roomSelectedUser) {
      this.roomService
        .sendMessage(this.roomSelectedUser._id, this.message)
        .subscribe((s) => console.log(s));
      this.message = '';
    }
  }

  onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault(); 
      this.sendMessage(); 
    }
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
}
