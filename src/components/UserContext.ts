import { createContext } from 'react';

interface IContext {
  username: string | null,
  setUsername: (active:string) => void
};

export const UserContext = createContext<IContext>({
  username:'default',
  setUsername: () => {}
});