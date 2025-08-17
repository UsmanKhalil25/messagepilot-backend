import { Field, ObjectType, ID } from '@nestjs/graphql';

import { CampaignChannel } from '../enums/campaign-channel.enum';
import { CampaignStatus } from '../enums/campaign-status.enum';
import { Contact } from 'src/contacts/types/contact.type';
import { PublicUser } from 'src/users/types/public-user.type';

@ObjectType()
export class Campaign {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => CampaignChannel)
  channelType: CampaignChannel;

  @Field(() => CampaignStatus)
  status: CampaignStatus;

  @Field(() => PublicUser)
  user: PublicUser;

  @Field(() => [Contact])
  contacts: Contact[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
