import { createSelector } from '@ngrx/store';
import { BasicUser } from '../../constants/constant';

// Define a feature selector to select the 'user' slice of the state
export const selectUserState = (state: { user: any }) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: any) => state.basicInfoUser
);

export const selectOplineUsersList = createSelector(
  selectUserState,
  (state: any) => state.onlineUsers
);
