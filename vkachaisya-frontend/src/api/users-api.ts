import { API_CLIENT } from './index';
import { IUser } from '../types/index';

export class UsersApi {
  static getCurrentUser = () => API_CLIENT.get('/api/users/current');
  static createCurrentUser = (user: IUser) => API_CLIENT.post('/api/users', user);
}
