import { ADD_USER } from "./actionCreator";

interface AddUsernameAction {
  type: typeof ADD_USER
  payload: string
}

export type UserActionTypes = AddUsernameAction
                              