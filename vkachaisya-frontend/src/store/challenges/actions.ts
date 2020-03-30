import { action, createAsyncAction } from 'typesafe-actions';
import { ChallengesActionTypes } from './types';
import { IChallenge } from '../../types';
import { ISearchChallenge } from '../../types/index';

export const getChallenges = () => action(ChallengesActionTypes.GET_CHALLENGES);
export const getChallengesAsync = createAsyncAction(
  ChallengesActionTypes.GET_CHALLENGES_REQUEST,
  ChallengesActionTypes.GET_CHALLENGES_SUCCESS,
  ChallengesActionTypes.GET_CHALLENGES_FAILURE,
)<undefined, IChallenge[], undefined>();

export const searchChallenges = () => action(ChallengesActionTypes.SEARCH_CHALLENGES);
export const searchChallengesAsync = createAsyncAction(
  ChallengesActionTypes.SEARCH_CHALLENGES_REQUEST,
  ChallengesActionTypes.SEARCH_CHALLENGES_SUCCESS,
  ChallengesActionTypes.SEARCH_CHALLENGES_FAILURE,
)<undefined, ISearchChallenge[], undefined>();

export const createChallenge = (challenge: Omit<IChallenge, 'id' | 'authorId'>) =>
  action(ChallengesActionTypes.CREATE_CHALLENGE, { challenge });
export const createChallengeAsync = createAsyncAction(
  ChallengesActionTypes.CREATE_CHALLENGE_REQUEST,
  ChallengesActionTypes.CREATE_CHALLENGE_SUCCESS,
  ChallengesActionTypes.CREATE_CHALLENGE_FAILURE,
)<undefined, IChallenge, undefined>();
