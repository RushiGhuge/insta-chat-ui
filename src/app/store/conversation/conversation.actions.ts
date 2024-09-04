import { createAction, props } from '@ngrx/store';
import { Conversation, Message } from '../../constants/constant';

export const loadConversation = createAction(
  '[Conversations] Load Conversations',
  props<{ conversation: Conversation }>()
);

export const addMessageToConversation = createAction(
  '[Conversations] Add Message To Conversation',
  props<{ conversation: Message }>()
);
