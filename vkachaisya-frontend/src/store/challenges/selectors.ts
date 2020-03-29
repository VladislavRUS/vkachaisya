import { IApplicationState } from '../index';

export const selectIsChallengeCreating = (state: IApplicationState) => state.challenges.isCreating;
