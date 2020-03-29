import { IApplicationState } from '../index';

export const isCurrentUserCreating = (state: IApplicationState) => state.users.isCreating;
