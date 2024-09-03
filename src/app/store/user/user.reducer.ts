// src/app/state/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUser, setOnlineUsers, updateUser } from './user.action';
import { BasicUserProfile } from '../../constants/constant';

export const initialUserState: BasicUserProfile = {
  basicInfoUser: {
    name: '',
    email: '',
    gender: '',
    profilePic: '',
    _id: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  },
  onlineUsers: [],
};

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }) => {
    return { ...state, basicInfoUser: { ...user } };
  }),
  on(updateUser, (state, { user }) => ({ ...state, ...user })),
  on(setOnlineUsers, (state, action) => {
    return { ...state, onlineUsers: [...action.users] };
  })
);
