import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.['auth-token'];
    if (token) {
      req.headers['authorization'] = `Bearer ${token}`;
    }
    next();
  }
}
