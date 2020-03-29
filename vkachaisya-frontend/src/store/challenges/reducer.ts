import { ChallengesActionTypes, IChallengesState } from './types';
import * as challengesActions from './actions';
import { ActionType, createReducer } from 'typesafe-actions';

type ChallengesActionType = ActionType<typeof challengesActions>;

const initialState: IChallengesState = {
  challenges: [],
  allChallenges: [],
  isFetching: false,
  isFetchingAll: false,
  isCreating: false,
};

export const challengesReducer = createReducer<IChallengesState, ChallengesActionType>(initialState)
  // Get challenges
  .handleType(
    ChallengesActionTypes.GET_CHALLENGES_REQUEST,
    (state): IChallengesState => ({ ...state, isFetching: true }),
  )
  .handleType(
    ChallengesActionTypes.GET_CHALLENGES_SUCCESS,
    (state, action): IChallengesState => ({
      ...state,
      isFetching: false,
      challenges: [...action.payload],
    }),
  )
  .handleType(
    ChallengesActionTypes.GET_CHALLENGES_FAILURE,
    (state): IChallengesState => ({ ...state, isFetching: false }),
  )

  // Get all challenges
  .handleType(
    ChallengesActionTypes.GET_ALL_CHALLENGES_REQUEST,
    (state): IChallengesState => ({ ...state, isFetchingAll: true }),
  )
  .handleType(
    ChallengesActionTypes.GET_ALL_CHALLENGES_SUCCESS,
    (state, action): IChallengesState => ({
      ...state,
      isFetchingAll: false,
      allChallenges: [...action.payload],
    }),
  )
  .handleType(
    ChallengesActionTypes.GET_ALL_CHALLENGES_FAILURE,
    (state): IChallengesState => ({ ...state, isFetchingAll: false }),
  )

  // Create challenge
  .handleType(
    ChallengesActionTypes.CREATE_CHALLENGE_REQUEST,
    (state): IChallengesState => ({ ...state, isCreating: true }),
  )
  .handleType(
    ChallengesActionTypes.CREATE_CHALLENGE_SUCCESS,
    (state, action): IChallengesState => ({
      ...state,
      isCreating: false,
      challenges: [...state.challenges, action.payload],
    }),
  )
  .handleType(
    ChallengesActionTypes.CREATE_CHALLENGE_FAILURE,
    (state): IChallengesState => ({ ...state, isCreating: false }),
  );
