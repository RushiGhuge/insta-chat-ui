import { createAction, props } from '@ngrx/store';

export const onlineUsers = createAction(
  "[Users] online User_id's list",
  props<{ users: string[] }>()
);
