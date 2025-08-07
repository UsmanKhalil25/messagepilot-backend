import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { CampaignsResolver } from './campaigns.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignsService, CampaignsResolver],
})
export class CampaignsModule {}
