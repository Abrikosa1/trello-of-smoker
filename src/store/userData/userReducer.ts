import { load } from 'redux-localstorage-simple';
import { User } from '../types';
import { ADD_USER } from "./actionCreators";
import { UserActionTypes } from './actionTypes';

let initialState: any = load({ namespace: 'data' });

if(!initialState.user) {
  initialState.user = {
    username: ''
  }
}

const userReducer = (state: User = initialState.user, action: UserActionTypes): User => {
  switch (action.type) {
    case ADD_USER:
      return {...state, username: action.payload}
    default:
      return state;
  }
}

export default userReducer;