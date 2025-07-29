import { registerEnumType } from '@nestjs/graphql';

export enum CampaignStatus {
  DRAFT = 'draft',
  QUEUED = 'queued',
  SENDING = 'sending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

registerEnumType(CampaignStatus, {
  name: 'CampaignStatus',
});
