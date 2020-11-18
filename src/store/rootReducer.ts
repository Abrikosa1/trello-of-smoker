import { combineReducers } from 'redux';
import data from './listsData/data';
import user from './userData/user';

const rootReducer = combineReducers({ data, user });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;