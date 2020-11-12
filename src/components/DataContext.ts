import { createContext, Dispatch } from 'react';
import { State } from '../types';
import { Actions } from '../reducer';


interface IDataContext {
  state: State;
  dispatch: Dispatch<Actions>;
};

export const DataContext = createContext<IDataContext>({
  state: JSON.parse(localStorage.getItem('lists') as string),
  dispatch: () => {}
});