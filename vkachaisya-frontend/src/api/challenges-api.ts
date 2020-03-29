import { API_CLIENT } from './index';

export class ChallengesApi {
  static getChallenges = () => API_CLIENT.get('/api/challenges');
  static getAllChallenges = () => API_CLIENT.get('/api/challenges/all');
  static createChallenge = (body: any) => API_CLIENT.post('/api/challenges', body);
}
