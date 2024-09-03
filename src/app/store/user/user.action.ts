// src/app/state/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { BasicUser } from '../../constants/constant';

export const loadUser = createAction(
  '[User] Load User',
  props<{ user: BasicUser }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: BasicUser }>()
);

export const setOnlineUsers = createAction(
  "[Users] online User_id's list",
  props<{ users: string[] }>()
);
