import { combineReducers } from 'redux';
import data from './state/data';
// import filters from './filters';

const rootReducer = combineReducers({ data });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;