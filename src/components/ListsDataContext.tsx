import { createContext, Dispatch } from 'react';
import { Actions } from '../dataReducer';
import { List } from '../types';

interface IListsDataContext {
  lists: Array<List>;
  dispatch: Dispatch<Actions>;
};

export const ListsDataContext = createContext<IListsDataContext>({
  lists: JSON.parse(localStorage.getItem('lists') as string),
  dispatch: () => {}
});