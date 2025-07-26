import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Campaign } from './campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
})
export class CampaignsModule { }
