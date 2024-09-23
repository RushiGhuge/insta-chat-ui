import { createReducer, on } from '@ngrx/store';
import { Conversation } from '../../constants/constant';
import {
  addMessageToConversation,
  loadConversation,
} from './conversation.actions';

export const initialUserState: Conversation = {
  createdAt: '',
  participants: [],
  messages: [],
  _id: '',
  updatedAt: '',
  __v: 0,
};

export const ConversationReducer = createReducer(
  initialUserState,
  on(loadConversation, (state, { conversation }) => {
    if (!conversation) {
      return initialUserState;
    }
    return {
      ...state,
      messages: conversation.messages,
      _id: conversation._id,
    };
  }),
  on(addMessageToConversation, (state, { conversation }) => {
    return {
      ...state,
      messages: [...state.messages, conversation],
    };
  })
);
