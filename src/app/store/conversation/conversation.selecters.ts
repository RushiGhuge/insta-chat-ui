import { createSelector } from '@ngrx/store';

export const selectConversation = (state: any) => state.conversations;

export const selectCurrentUserConversation = createSelector(
  selectConversation,
  (state: any) => state
);
