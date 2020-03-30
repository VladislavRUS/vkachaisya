import { IUser } from '../../types/index';

export interface IAttendeesState {
  attendees: IUser;
  isFetching: boolean;
}

export enum AttendeesActionTypes {
  GET_ATTENDEES = '@@attendees/GET_ATTENDEES',
  GET_ATTENDEES_REQUEST = '@@attendees/GET_ATTENDEES_REQUEST',
  GET_ATTENDEES_SUCCESS = '@@attendees/GET_ATTENDEES_SUCCESS',
  GET_ATTENDEES_FAILURE = '@@attendees/GET_ATTENDEES_FAILURE',
}
