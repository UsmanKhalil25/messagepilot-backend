import { registerEnumType } from '@nestjs/graphql';

export enum CampaignSortBy {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  STATUS = 'STATUS',
  UPDATED_AT = 'UPDATED_AT',
}

registerEnumType(CampaignSortBy, {
  name: 'CampaignSortBy',
});
