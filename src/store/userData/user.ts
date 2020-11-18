import { load } from 'redux-localstorage-simple';
import { ADD_USER } from "./actionCreator";

let data: any = load({ namespace: 'data' });

if(!data.user) {
  data.user = {
    username: ''
  }
}

const user = (state: any = data.user, action: any): any => {
  switch (action.type) {
    case ADD_USER:
      return {...state, username: action.payload}
    default:
      return state;
  }
}

export default user;