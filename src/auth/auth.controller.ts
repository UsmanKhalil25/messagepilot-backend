import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
  Res,
  Get,
} from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { ConfigService } from '@nestjs/config';

import { UsersService } from 'src/users/users.service';
import { PublicUser } from 'src/users/types/public-user.type';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { parseDurationToMs } from 'src/commom/utils/time.util';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _: LoginUserDto,
    @Request() req: ExpressRequest & { user: PublicUser },
    @Res() res: ExpressResponse,
  ) {
    const { accessToken } = await this.authService.login(req.user);

    const jwtExpiresIn =
      this.configService.get<string>('auth.jwtExpiresIn') || '1d';
    const cookieName = 'auth-token';
    const maxAge = parseDurationToMs(jwtExpiresIn);
    const validPath = '/';

    res.cookie(cookieName, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge,
      path: validPath,
    });

    return res.json({
      message: 'Login successful',
      data: null,
    });
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    if (registerUserDto.password !== registerUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const { confirmPassword: _, ...userData } = registerUserDto;
    const user = await this.userService.createUser(userData);
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyToken(@Request() req: ExpressRequest & { user: PublicUser }) {
    return {
      valid: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
      },
      message: 'Token is valid',
    };
  }
}
