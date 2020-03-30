export interface ISubscription {
  id: number;
  startDate: string;
  challenge: IChallenge;
}

export interface ISearchChallenge {
  challenge: IChallenge;
  totalParticipants: number;
  avatars: string[];
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

export interface IUser {
  id: number;
}
