import { IApplicationState } from '../index';

export const selectSubscriptions = (state: IApplicationState) => state.subscriptions.subscriptions;
export const selectUserSubscription = (state: IApplicationState) => state.subscriptions.userSubscription;
