import { IApplicationState } from '../index';

export const selectSearchChallenges = (state: IApplicationState) => state.challenges.searchChallenges;
export const selectIsChallengeCreating = (state: IApplicationState) => state.challenges.isCreating;
export const selectIsChallengesSearching = (state: IApplicationState) => state.challenges.isSearching;
export const selectHasMoreChallenges = (state: IApplicationState) => state.challenges.hasMore;
