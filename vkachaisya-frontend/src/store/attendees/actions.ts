import { AttendeesActionTypes } from './types';
import { action } from 'typesafe-actions';

export const getSubscriptionAttendees = (subscriptionId: number) =>
  action(AttendeesActionTypes.GET_ATTENDEES, { subscriptionId });
