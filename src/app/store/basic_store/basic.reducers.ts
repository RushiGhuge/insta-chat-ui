// src/app/state/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { onlineUsers } from './basic.actions';

export const initialUserState = {
  listOfOnlineUsers: [],
};

export const basicStoreReducer = createReducer(
  initialUserState,
  on(onlineUsers, (state, action) => {
    console.log('online', state, action);
    return { ...state };
  })
);

