import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 와 passport-local은 username과 password만 받을 수 있음
 * {
 *  email: 'xxxx@xxx.xxx',
 *  pw: 'xxxxx'
 * }
 * 이런식으로 보내면 401 인증 에러가 남;;;;
 */

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);

    if (can) {
      const request = context.switchToHttp().getRequest();
      console.log('login for cookie');
      await super.logIn(request);
    }

    return true;
  }
}