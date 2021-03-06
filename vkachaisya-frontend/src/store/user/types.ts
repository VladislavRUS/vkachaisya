import { IUser } from '../../types';

export interface IUserState {
  current: IUser | null;
  isFetching: boolean;
  isCreating: boolean;
}

export enum UserActionTypes {
  GET_CURRENT_USER = '@@user/GET_CURRENT_USER',
  GET_CURRENT_USER_REQUEST = '@@user/GET_CURRENT_USER_REQUEST',
  GET_CURRENT_USER_SUCCESS = '@@user/GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE = '@@user/GET_CURRENT_USER_FAILURE',

  CREATE_CURRENT_USER = '@@user/CREATE_CURRENT_USER',
  CREATE_CURRENT_USER_REQUEST = '@@user/CREATE_CURRENT_USER_REQUEST',
  CREATE_CURRENT_USER_SUCCESS = '@@user/CREATE_CURRENT_USER_SUCCESS',
  CREATE_CURRENT_USER_FAILURE = '@@user/CREATE_CURRENT_USER_FAILURE',
}
