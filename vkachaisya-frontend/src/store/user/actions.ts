import { action, createAsyncAction } from 'typesafe-actions';
import { UserActionTypes } from './types';
import { IUser } from '../../types';

export const getCurrentUser = () => action(UserActionTypes.GET_CURRENT_USER);
export const getCurrentUserAsync = createAsyncAction(
  UserActionTypes.GET_CURRENT_USER_REQUEST,
  UserActionTypes.GET_CURRENT_USER_SUCCESS,
  UserActionTypes.GET_CURRENT_USER_FAILURE,
)<undefined, IUser, undefined>();

export const createCurrentUser = () => action(UserActionTypes.CREATE_CURRENT_USER);
export const createCurrentUserAsync = createAsyncAction(
  UserActionTypes.CREATE_CURRENT_USER_REQUEST,
  UserActionTypes.CREATE_CURRENT_USER_SUCCESS,
  UserActionTypes.CREATE_CURRENT_USER_FAILURE,
)<undefined, IUser, undefined>();
