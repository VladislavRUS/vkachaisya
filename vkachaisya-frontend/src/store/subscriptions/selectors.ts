import { IApplicationState } from '../index';
import { createSelector } from 'reselect';
import { selectCurrentUser } from '../user/selectors';
import { differenceInCalendarDays } from 'date-fns';
import { ISubscription } from '../../types/index';

export const selectSubscriptions = (state: IApplicationState) => state.subscriptions.subscriptions;
export const selectIsSubscriptionCreating = (state: IApplicationState) => state.subscriptions.isCreating;
export const selectIsFetchingSubscriptionResult = (state: IApplicationState) =>
  state.subscriptions.isFetchingSubscriptionResult;

const sortSubscriptionsByDate = (first: ISubscription, second: ISubscription) => {
  return new Date(second.startDate).getTime() - new Date(first.startDate).getTime();
};

export const selectCurrentSubscriptions = createSelector(
  [selectSubscriptions, selectCurrentUser],
  (subscriptions, user) => {
    if (!user) {
      return [];
    }

    const now = new Date();

    return subscriptions
      .filter((subscription) => {
        return differenceInCalendarDays(now, new Date(subscription.startDate)) <= subscription.days;
      })
      .sort(sortSubscriptionsByDate);
  },
);

export const selectFinishedSubscriptions = createSelector(
  [selectSubscriptions, selectCurrentUser],
  (subscriptions, user) => {
    if (!user) {
      return [];
    }

    const now = new Date();

    return subscriptions
      .filter((subscription) => {
        return differenceInCalendarDays(now, new Date(subscription.startDate)) > subscription.days;
      })
      .sort(sortSubscriptionsByDate);
  },
);

export const selectSubscriptionResult = (state: IApplicationState) => state.subscriptions.subscriptionResult;
export const selectIsFetchingSubscriptions = (state: IApplicationState) => state.subscriptions.isFetchingSubscriptions;
export const selectJoinedChallenge = (state: IApplicationState) => state.subscriptions.joinedChallenge;
export const selectJoinedSubscription = (state: IApplicationState) => {
  if (!state.subscriptions.joinedChallenge) {
    return;
  }

  const challengeId = state.subscriptions.joinedChallenge.id;

  return state.subscriptions.subscriptions.find((subscription) => subscription.challengeId === challengeId);
};
