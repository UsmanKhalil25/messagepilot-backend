import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response } from 'express';

interface ResponseData {
  message?: string;
  data?: unknown;
}

@Injectable()
export class RestResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((data: ResponseData) => {
        return {
          statusCode: response.statusCode,
          message: data?.message || 'Success',
          data: data?.data ?? null,
        };
      }),
    );
  }
}
