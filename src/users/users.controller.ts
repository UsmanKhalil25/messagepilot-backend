import {
  Controller,
  Get,
  Request as NestRequest,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@NestRequest() req: Request & { user: { id: string } }) {
    return this.usersService.findUserById(req.user.id, {
      exclude: ['password'],
    });
  }
}
