import { createContext, SetStateAction } from 'react';
import { List } from './types';

interface IDataContext {
  lists: Array<List> 
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
};

export const DataContext = createContext<IDataContext>({
  lists: JSON.parse(localStorage.getItem('lists') || ''),
  setLists: () => {}
});