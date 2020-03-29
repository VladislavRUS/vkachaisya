export interface ISubscription {
  id: number;
  startDate: string;
}

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  days: number;
  authorId: number;
  withReport: boolean;
}

export interface IReport {
  id: number;
  text: string;
  day: number;
  files: IFile[];
}

export interface IFile {
  id: number;
  name: string;
  type: 'image' | 'video';
  path: string;
}

export interface IUserChallengeInfo {
  subscription: ISubscription;
  challenge: IChallenge;
  reports: IReport[];
}

export interface IUser {
  id: number;
}
