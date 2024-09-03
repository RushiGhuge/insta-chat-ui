import { Component, Input } from '@angular/core';
import { Conversation, User } from '../../constants/constant';

@Component({
  selector: 'app-message-text',
  templateUrl: './message-text.component.html',
  styleUrl: './message-text.component.scss',
})
export class MessageTextComponent {
  @Input() conversation: Conversation | undefined;
  @Input() roomSelectedUser: User | undefined;


  ngOnInit(): void {
  }
}
