import { IApplicationState } from '../index';

export const selectAllChallenges = (state: IApplicationState) => state.challenges.allChallenges;
export const selectIsChallengeCreating = (state: IApplicationState) => state.challenges.isCreating;
