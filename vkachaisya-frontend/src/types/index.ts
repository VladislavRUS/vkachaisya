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
  hashtag: string;
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
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface ISubscription {
  id: number;
  title: string;
  hashtag: string;
  startDate: string;
  days: number;
  avatars: string[];
  totalParticipants: number;
}

export interface ISubscriptionResult {
  id: number;
  title: string;
  hashtag: string;
  startDate: string;
  days: number;
  users: IUser[];
}
