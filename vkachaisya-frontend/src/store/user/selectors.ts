import { IApplicationState } from '../index';

export const selectCurrentUser = (state: IApplicationState) => state.user.current;

export const selectIsCurrentUserFetching = (state: IApplicationState) => state.user.isFetching;
export const isCurrentUserCreating = (state: IApplicationState) => state.user.isCreating;
