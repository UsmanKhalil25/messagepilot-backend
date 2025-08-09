import { Mutation, Resolver, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateContactInput } from './inputs/create-contact.input';
import { JwtPayload } from 'src/commom/interfaces/jwt-payload.interface';
import { Contact } from './types/contact.type';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  createContact(
    @Args('input') input: CreateContactInput,
    @Context() context: { req: { user: JwtPayload } },
  ) {
    const userId = context.req.user.sub;
    return this.contactsService.createContact(input, userId);
  }
}
