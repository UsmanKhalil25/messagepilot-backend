import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response } from 'express';

// Define the expected structure of your response data
interface ResponseData {
  message?: string;
  data?: unknown;
}

// Define the final transformed response structure
interface TransformedResponse {
  statusCode: number;
  message: string;
  data: unknown;
}

@Injectable()
export class TransformResponseInterceptor
  implements NestInterceptor<ResponseData, TransformedResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseData>,
  ): Observable<TransformedResponse> {
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
