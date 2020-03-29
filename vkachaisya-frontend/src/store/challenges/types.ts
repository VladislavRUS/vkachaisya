import { IChallenge } from '../../types';

export interface IChallengesState {
  challenges: IChallenge[];
  allChallenges: IChallenge[];
  isFetching: boolean;
  isFetchingAll: boolean;
  isCreating: boolean;
}

export enum ChallengesActionTypes {
  GET_CHALLENGES = '@@challenges/GET_CHALLENGES',
  GET_CHALLENGES_REQUEST = '@@challenges/GET_CHALLENGES_REQUEST',
  GET_CHALLENGES_SUCCESS = '@@challenges/GET_CHALLENGES_SUCCESS',
  GET_CHALLENGES_FAILURE = '@@challenges/GET_CHALLENGES_FAILURE',

  GET_ALL_CHALLENGES = '@@challenges/GET_ALL_CHALLENGES',
  GET_ALL_CHALLENGES_REQUEST = '@@challenges/GET_ALL_CHALLENGES_REQUEST',
  GET_ALL_CHALLENGES_SUCCESS = '@@challenges/GET_ALL_CHALLENGES_SUCCESS',
  GET_ALL_CHALLENGES_FAILURE = '@@challenges/GET_ALL_CHALLENGES_FAILURE',

  CREATE_CHALLENGE = '@@challenges/CREATE_CHALLENGE',
  CREATE_CHALLENGE_REQUEST = '@@challenges/CREATE_CHALLENGE_REQUEST',
  CREATE_CHALLENGE_SUCCESS = '@@challenges/CREATE_CHALLENGE_SUCCESS',
  CREATE_CHALLENGE_FAILURE = '@@challenges/CREATE_CHALLENGE_FAILURE',
}
