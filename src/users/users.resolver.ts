import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../commom/interfaces/jwt-payload.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async currentUser(@Context() context: any): Promise<User | null> {
    const user = context.req.user as JwtPayload;
    return this.usersService.findUserById(user.sub);
  }
}
