import { Component, Input } from '@angular/core';
import { Message, User } from '../../constants/constant';

@Component({
  selector: 'app-message-text',
  templateUrl: './message-text.component.html',
  styleUrl: './message-text.component.scss',
})
export class MessageTextComponent {
  @Input() message: Message | undefined;
  @Input() roomSelectedUser: User | undefined;
  ourmessage = false;

  ngOnInit(): void {
    this.ourmessage = this.roomSelectedUser?._id !== this.message?.senderId; 
  }
}
