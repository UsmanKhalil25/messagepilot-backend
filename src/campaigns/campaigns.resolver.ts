import { Query, Mutation, Resolver, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AddContactsToCampaignInput } from './dto/add-contacts-to-campaign.input';
import { CampaignsResponse } from './dto/campaigns-response.dto';
import { PaginationArgs } from 'src/commom/dto/pagination-args.dto';
import { CampaignFiltersInput } from './dto/campaign-filters.input';
import { CreateCampaignInput } from './dto/create-campaign.input';

import { Campaign } from './models/campaign.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';
import { JwtPayload } from 'src/commom/interfaces/jwt-payload.interface';

@Resolver(() => Campaign)
export class CampaignsResolver {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Query(() => Campaign)
  @UseGuards(JwtAuthGuard)
  campaign(
    @Args('id') id: string,
    @Context() context: { req: { user: JwtPayload } },
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.findById(id, userId);
  }

  @Query(() => CampaignsResponse)
  @UseGuards(JwtAuthGuard)
  campaigns(
    @Context() context: { req: { user: JwtPayload } },
    @Args() paginationArgs: PaginationArgs,
    @Args('filters', { nullable: true }) filters?: CampaignFiltersInput,
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.findMany(userId, paginationArgs, filters);
  }

  @Mutation(() => Campaign)
  @UseGuards(JwtAuthGuard)
  createCampaign(
    @Context() context: { req: { user: JwtPayload } },
    @Args('input') input: CreateCampaignInput,
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.createCampaign(input, userId);
  }

  @Mutation(() => Campaign)
  @UseGuards(JwtAuthGuard)
  addContactsToCampaign(
    @Context() context: { req: { user: JwtPayload } },
    @Args('input') input: AddContactsToCampaignInput,
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.addContacts(input, userId);
  }
}
