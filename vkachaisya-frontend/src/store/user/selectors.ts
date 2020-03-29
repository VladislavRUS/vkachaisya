import { IApplicationState } from '../index';

export const selectCurrentUser = (state: IApplicationState) => state.user.current;

export const isCurrentUserCreating = (state: IApplicationState) => state.user.isCreating;
