import { combineReducers } from 'redux';
import dataReducer from './listsData/dataReducer';
import userReducer from './userData/userReducer';


const rootReducer = combineReducers({ 
  data: dataReducer, 
  user: userReducer,
});


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;