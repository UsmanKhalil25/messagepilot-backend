import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContactType } from '../enums/contact-type.enum';

@ObjectType()
export class ContactChannel {
  @Field(() => ID)
  id: string;

  @Field(() => ContactType)
  type: ContactType;

  @Field()
  value: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
