import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { PublicUser } from 'src/users/types/public-user.type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Body() _: LoginUserDto,
    @Request() req: ExpressRequest & { user: PublicUser },
  ) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }
}
