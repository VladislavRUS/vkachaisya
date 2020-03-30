import { ChallengesActionTypes, IChallengesState } from './types';
import * as challengesActions from './actions';
import { ActionType, createReducer } from 'typesafe-actions';

type ChallengesActionType = ActionType<typeof challengesActions>;

const initialState: IChallengesState = {
  challenges: [],
  searchChallenges: [],
  isFetching: false,
  isSearching: false,
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
    ChallengesActionTypes.SEARCH_CHALLENGES_REQUEST,
    (state): IChallengesState => ({ ...state, isSearching: true }),
  )
  .handleType(
    ChallengesActionTypes.SEARCH_CHALLENGES_SUCCESS,
    (state, action): IChallengesState => ({
      ...state,
      isSearching: false,
      searchChallenges: [...action.payload],
    }),
  )
  .handleType(
    ChallengesActionTypes.SEARCH_CHALLENGES_FAILURE,
    (state): IChallengesState => ({ ...state, isSearching: false }),
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
