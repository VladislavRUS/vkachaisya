import { IUserState, UserActionTypes } from './types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as usersActions from './actions';

type UsersActionType = ActionType<typeof usersActions>;

const initialState: IUserState = {
  current: null,
  isFetching: false,
  isCreating: false,
};

export const userReducer = createReducer<IUserState, UsersActionType>(initialState)
  // Get current user
  .handleType(UserActionTypes.GET_CURRENT_USER_REQUEST, (state): IUserState => ({ ...state, isFetching: true }))
  .handleType(
    UserActionTypes.GET_CURRENT_USER_SUCCESS,
    (state, action): IUserState => ({ ...state, isFetching: false, current: action.payload }),
  )
  .handleType(UserActionTypes.GET_CURRENT_USER_FAILURE, (state): IUserState => ({ ...state, isFetching: false }))

  // Create current user
  .handleType(UserActionTypes.CREATE_CURRENT_USER_REQUEST, (state): IUserState => ({ ...state, isCreating: true }))
  .handleType(
    UserActionTypes.CREATE_CURRENT_USER_SUCCESS,
    (state, action): IUserState => ({ ...state, isCreating: false, current: action.payload }),
  )
  .handleType(UserActionTypes.CREATE_CURRENT_USER_FAILURE, (state): IUserState => ({ ...state, isCreating: false }));
