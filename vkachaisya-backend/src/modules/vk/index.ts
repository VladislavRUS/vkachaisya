import { VK } from 'vk-io';
import config from '../../../config.json';
import { VKUser } from './types';

export class VkApi {
  vk!: any;

  init() {
    this.vk = new VK({
      appId: config.appId,
      appSecret: config.appSecret,
      token: config.appAccessToken,
    });
  }

  getUsers = (userIds: number[]): Promise<VKUser[]> => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return this.vk.api.call('users.get', { user_ids: userIds, fields: ['photo_50'] });
  };
}

const VK_API = new VkApi();

export { VK_API };
