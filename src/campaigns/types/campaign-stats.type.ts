import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class CampaignStatusStats {
  @Field(() => Int)
  draft: number;

  @Field(() => Int)
  queued: number;

  @Field(() => Int)
  active: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  failed: number;
}

@ObjectType()
export class CampaignChannelStats {
  @Field(() => Int)
  email: number;

  @Field(() => Int)
  sms: number;

  @Field(() => Int)
  whatsapp: number;

  @Field(() => Int)
  slack: number;

  @Field(() => Int)
  discord: number;
}

@ObjectType()
export class CampaignStats {
  @Field(() => Int)
  totalCampaigns: number;

  @Field(() => CampaignStatusStats)
  campaignsByStatus: CampaignStatusStats;

  @Field(() => CampaignChannelStats)
  campaignsByChannel: CampaignChannelStats;

  @Field(() => Int)
  totalContacts: number;
}
