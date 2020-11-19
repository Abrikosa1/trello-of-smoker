import { ADD_USER } from "./actionCreators";

interface AddUsernameAction {
  type: typeof ADD_USER
  payload: string
}

export type UserActionTypes = AddUsernameAction
                              