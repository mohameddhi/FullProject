import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { decodeAuthToken } from '../utility/token-generator';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    try {
      console.log('AuthMiddleware', req.headers);
      const token = req.cookies._auth_token;
      if (!token) {
        throw new UnauthorizedException('Missing auth token');
      }
      const decodedData: any = decodeAuthToken(token);
      const user = await this.userDB.findById(decodedData.id);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
