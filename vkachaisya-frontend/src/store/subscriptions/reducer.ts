import { ISubscriptionsState, SubscriptionsActionTypes } from './types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

type SubscriptionsActionType = ActionType<typeof actions>;

const initialState: ISubscriptionsState = {
  subscriptions: [],
  userSubscription: null,
  isFetchingSubscriptions: false,
  isFetchingUserSubscription: false,
};

export const subscriptionsReducer = createReducer<ISubscriptionsState, SubscriptionsActionType>(initialState)
  // Get subscriptions
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_REQUEST,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptions: true }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
    (state, action): ISubscriptionsState => ({
      ...state,
      isFetchingSubscriptions: false,
      subscriptions: [...action.payload],
    }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
    (state): ISubscriptionsState => ({ ...state, isFetchingSubscriptions: false }),
  )

  // Get user subscription
  .handleType(
    SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_REQUEST,
    (state): ISubscriptionsState => ({ ...state, isFetchingUserSubscription: true }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
    (state, action): ISubscriptionsState => ({
      ...state,
      isFetchingUserSubscription: false,
      userSubscription: action.payload,
    }),
  )
  .handleType(
    SubscriptionsActionTypes.GET_USER_SUBSCRIPTION_FAILURE,
    (state): ISubscriptionsState => ({ ...state, isFetchingUserSubscription: false }),
  );
