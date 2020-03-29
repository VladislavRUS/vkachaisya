import { action, createAsyncAction } from 'typesafe-actions';
import { ChallengesActionTypes } from './types';
import { IChallenge } from '../../types';

export const getChallenges = () => action(ChallengesActionTypes.GET_CHALLENGES);
export const getChallengesAsync = createAsyncAction(
  ChallengesActionTypes.GET_CHALLENGES_REQUEST,
  ChallengesActionTypes.GET_CHALLENGES_SUCCESS,
  ChallengesActionTypes.GET_CHALLENGES_FAILURE,
)<undefined, IChallenge[], undefined>();

export const getAllChallenges = () => action(ChallengesActionTypes.GET_ALL_CHALLENGES);
export const getAllChallengesAsync = createAsyncAction(
  ChallengesActionTypes.GET_ALL_CHALLENGES_REQUEST,
  ChallengesActionTypes.GET_ALL_CHALLENGES_SUCCESS,
  ChallengesActionTypes.GET_ALL_CHALLENGES_FAILURE,
)<undefined, IChallenge[], undefined>();

export const createChallenge = (challenge: Omit<IChallenge, 'id' | 'authorId'>) =>
  action(ChallengesActionTypes.CREATE_CHALLENGE, { challenge });
export const createChallengeAsync = createAsyncAction(
  ChallengesActionTypes.CREATE_CHALLENGE_REQUEST,
  ChallengesActionTypes.CREATE_CHALLENGE_SUCCESS,
  ChallengesActionTypes.CREATE_CHALLENGE_FAILURE,
)<undefined, IChallenge, undefined>();
