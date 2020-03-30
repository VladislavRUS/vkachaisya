import { IChallenge } from '../../types';
import { ISearchChallenge } from '../../types/index';

export interface IChallengesState {
  challenges: IChallenge[];
  searchChallenges: ISearchChallenge[];
  isFetching: boolean;
  isSearching: boolean;
  isCreating: boolean;
}

export enum ChallengesActionTypes {
  GET_CHALLENGES = '@@challenges/GET_CHALLENGES',
  GET_CHALLENGES_REQUEST = '@@challenges/GET_CHALLENGES_REQUEST',
  GET_CHALLENGES_SUCCESS = '@@challenges/GET_CHALLENGES_SUCCESS',
  GET_CHALLENGES_FAILURE = '@@challenges/GET_CHALLENGES_FAILURE',

  SEARCH_CHALLENGES = '@@challenges/SEARCH_CHALLENGES',
  SEARCH_CHALLENGES_REQUEST = '@@challenges/SEARCH_CHALLENGES_REQUEST',
  SEARCH_CHALLENGES_SUCCESS = '@@challenges/SEARCH_CHALLENGES_SUCCESS',
  SEARCH_CHALLENGES_FAILURE = '@@challenges/SEARCH_CHALLENGES_FAILURE',

  CREATE_CHALLENGE = '@@challenges/CREATE_CHALLENGE',
  CREATE_CHALLENGE_REQUEST = '@@challenges/CREATE_CHALLENGE_REQUEST',
  CREATE_CHALLENGE_SUCCESS = '@@challenges/CREATE_CHALLENGE_SUCCESS',
  CREATE_CHALLENGE_FAILURE = '@@challenges/CREATE_CHALLENGE_FAILURE',
}
