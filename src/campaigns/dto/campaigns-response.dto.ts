import { ObjectType, Field } from '@nestjs/graphql';

import { PaginationInfo } from 'src/commom/dto/paginated-info.dto';
import { Campaign } from '../models/campaign.model';

@ObjectType()
export class CampaignsResponse {
  @Field(() => [Campaign])
  campaigns: Campaign[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}
