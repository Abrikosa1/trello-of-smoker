import { UserActionTypes } from "./actionTypes";

export const ADD_USER = 'ADD_USER';

export const addUsername = (username: string): UserActionTypes => ({
  type: ADD_USER,
  payload: username,
});
