import { API_CLIENT } from './index';

export class UsersApi {
  static getCurrentUser = () => API_CLIENT.get('/api/users/current');
  static createCurrentUser = () => API_CLIENT.post('/api/users');
}
