import { createSelector } from '@ngrx/store';

export const selectUserState = (state: { data: any }) => state;

export const selectOplineUsersList = createSelector(
  selectUserState,
  (state: any) => state
);
