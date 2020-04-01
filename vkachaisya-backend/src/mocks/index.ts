import { User } from 'src/database/entities/User';
import { Challenge } from 'src/database/entities/Challenge';
import { Subscription } from 'src/database/entities/Subscription';

export class Mock {
  static getMock() {
    const users = [];
    const challenges = [];
    const subscriptions = [];

    const user = new User();
    user.id = 9872504;
    user.firstName = 'Vladislav';
    user.lastName = 'Kurochkin';
    user.avatar = `https://avatars.dicebear.com/v2/male/${9872504}.svg`;

    users.push(user);

    for (let i = 0; i < 10; i++) {
      const user = new User();
      user.id = i;
      user.firstName = 'asasdf';
      user.lastName = 'asdf';
      user.avatar = `https://avatars.dicebear.com/v2/male/${i}.svg`;

      users.push(user);
    }

    for (let i = 0; i < 30; i++) {
      const challenge = new Challenge();
      challenge.id = i;
      challenge.authorId = users[Math.floor(Math.random() * users.length)].id;
      challenge.title = 'Test challenge: ' + i;
      challenge.days = Math.floor(Math.random() * 9 + 1);
      challenge.description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      challenge.withReport = Math.random() > 0.5;
      challenge.hashtag = '#ВкачайсяChallenge' + i;

      challenges.push(challenge);

      for (let i = 0; i < Math.floor(Math.random() * users.length); i++) {
        const subscription = new Subscription();
        subscription.id = i;
        subscription.startDate = new Date(new Date().getTime() - Math.random() * 1000000000).toString();
        subscription.user = users[Math.floor(Math.random() * users.length)];
        subscription.reports = [];
        subscription.challenge = challenge;

        subscriptions.push(subscription);
      }
    }

    return { users, challenges, subscriptions };
  }
}
