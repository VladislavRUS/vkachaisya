import { IApplicationState } from '../index';
import { createSelector } from 'reselect';
import { selectCurrentUser } from '../user/selectors';
import { differenceInCalendarDays } from 'date-fns';

export const selectSubscriptions = (state: IApplicationState) => state.subscriptions.subscriptions;

export const selectCurrentSubscriptions = createSelector(
  [selectSubscriptions, selectCurrentUser],
  (subscriptions, user) => {
    if (!user) {
      return [];
    }

    const now = new Date();

    return subscriptions.filter((subscription) => {
      return differenceInCalendarDays(now, new Date(subscription.startDate)) <= subscription.days;
    });
  },
);

export const selectFinishedSubscriptions = createSelector(
  [selectSubscriptions, selectCurrentUser],
  (subscriptions, user) => {
    if (!user) {
      return [];
    }

    const now = new Date();

    return subscriptions.filter((subscription) => {
      return differenceInCalendarDays(now, new Date(subscription.startDate)) > subscription.days;
    });
  },
);

export const selectSubscriptionResult = (state: IApplicationState) => state.subscriptions.subscriptionResult;
export const selectIsFetchingSubscriptions = (state: IApplicationState) => state.subscriptions.isFetchingSubscriptions;
export const selectJoinedChallenge = (state: IApplicationState) => state.subscriptions.joinedChallenge;
