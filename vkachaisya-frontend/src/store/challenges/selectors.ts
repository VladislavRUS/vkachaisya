import { IApplicationState } from '../index';

export const selectSearchChallenges = (state: IApplicationState) => state.challenges.searchChallenges;
export const selectIsChallengeCreating = (state: IApplicationState) => state.challenges.isCreating;
