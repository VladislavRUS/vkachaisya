import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import crypto from 'crypto';
import qs from 'querystring';
import config from '../../../config.json';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: Request) {
    const urlParams = qs.parse(request.header('url'));

    const ordered = {};
    Object.keys(urlParams)
      .sort()
      .forEach(key => {
        if (key.slice(0, 3) === 'vk_') {
          ordered[key] = urlParams[key];
        }
      });

    const stringParams = qs.stringify(ordered);
    const paramsHash = crypto
      .createHmac('sha256', config.secretKey)
      .update(stringParams)
      .digest()
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=$/, '');

    if (paramsHash === urlParams.sign) {
      request.headers['userId'] = urlParams['vk_user_id'];
      return true;
    } else {
      return false;
    }
  }
}
