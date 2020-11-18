export const ADD_USER = 'ADD_USER';
//lists
export const addUsername = (username: string) => ({
  type: ADD_USER,
  payload: username,
});
