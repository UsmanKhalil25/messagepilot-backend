import { registerEnumType } from '@nestjs/graphql';

export enum CampaignChannel {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  SLACK = 'slack',
  DISCORD = 'discord',
}

registerEnumType(CampaignChannel, {
  name: 'CampaignChannel',
});
