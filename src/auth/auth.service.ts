import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import {
  AuthenticatedUser,
  JwtPayload,
  AuthResponse,
} from './interfaces/login-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.findUserByEmailWithPassword(email);
    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        fullName: `${user.firstName} ${user.lastName}`,
        lastLoginAt: user.lastLoginAt || null,
      };
    }
    return null;
  }

  async login(authenticatedUser: AuthenticatedUser): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: authenticatedUser.id,
      email: authenticatedUser.email,
    };

    // Update last login time
    await this.usersService.updateLastLogin(authenticatedUser.id);

    return {
      access_token: this.jwtService.sign(payload),
      user: authenticatedUser,
    };
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verify(token);
  }
}
