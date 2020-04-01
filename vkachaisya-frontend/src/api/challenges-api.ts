import { API_CLIENT } from './index';

export class ChallengesApi {
  static getChallenges = () => API_CLIENT.get('/api/challenges');
  static searchChallenges = (skip: number, take: number) =>
    API_CLIENT.get(`/api/challenges/search?skip=${skip}&take=${take}`);
  static createChallenge = (body: any) => API_CLIENT.post('/api/challenges', body);
}
