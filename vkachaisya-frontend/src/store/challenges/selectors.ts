import { IApplicationState } from '../index';
import { createSelector } from 'reselect';
import { selectSubscriptions } from '../subscriptions/selectors';

export const selectSearchChallenges = (state: IApplicationState) => state.challenges.searchChallenges;
export const selectUserSearchChallenges = createSelector(
  [selectSearchChallenges, selectSubscriptions],
  (searchChallenges, subscriptions) => {
    return searchChallenges.filter(
      (searchChallenge) =>
        subscriptions.findIndex((subscription) => subscription.challengeId === searchChallenge.challenge.id) === -1,
    );
  },
);

export const selectIsChallengeCreating = (state: IApplicationState) => state.challenges.isCreating;
export const selectIsChallengesSearching = (state: IApplicationState) => state.challenges.isSearching;
export const selectHasMoreChallenges = (state: IApplicationState) => state.challenges.hasMore;
