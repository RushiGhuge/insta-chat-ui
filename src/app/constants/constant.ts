export interface User {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone_no: string;
  age: number;
  profilePic: string;
  _id: string;
}

export interface BasicUser {
  name: string;
  email: string;
  gender: string;
  profilePic: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface BasicUserProfile {
  basicInfoUser: {
    name: string;
    email: string;
    gender: string;
    profilePic: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  onlineUsers: string[];
}

export interface Conversation {
  createdAt: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
