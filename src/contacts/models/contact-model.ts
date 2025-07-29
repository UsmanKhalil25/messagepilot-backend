import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContactChannel } from 'src/contact-channel/models/contact-channel.model';

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ContactChannel])
  contactChannels: ContactChannel[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
