import { API_CLIENT } from './index';

export class ChallengesApi {
  static getChallenges = () => API_CLIENT.get('/api/challenges');
  static searchChallenges = () => API_CLIENT.get('/api/challenges/search');
  static createChallenge = (body: any) => API_CLIENT.post('/api/challenges', body);
}
