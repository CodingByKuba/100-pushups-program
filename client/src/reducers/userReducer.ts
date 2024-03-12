import { UserReducerActions } from "../data/enums";
import { userInitialState } from "../data/initialState";
import { ActionType, UserInitialStateType } from "../data/types";

const userReducer = (
  state: UserInitialStateType = userInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case UserReducerActions.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: (action.payload as string) ? action.payload : "",
      };
    case UserReducerActions.SET_EMAIL:
      return {
        ...state,
        email: (action.payload as string) ? action.payload : "",
      };
    case UserReducerActions.SET_LAST_LOGIN:
      return {
        ...state,
        lastLogin: (action.payload as Date) ? action.payload : undefined,
      };
    case UserReducerActions.SET_CREATED_AT:
      return {
        ...state,
        createdAt: (action.payload as Date) ? action.payload : undefined,
      };
    case UserReducerActions.SET_UPDATED_AT:
      return {
        ...state,
        updatedAt: (action.payload as Date) ? action.payload : undefined,
      };
    case UserReducerActions.RESET:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
