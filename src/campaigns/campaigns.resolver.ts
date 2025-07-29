import { Query, Mutation, Resolver, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateCampaignInput } from './dto/create-campaign.input';
import { Campaign } from './models/campaign.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignsService } from './campaigns.service';
import { JwtPayload } from 'src/commom/interfaces/jwt-payload.interface';
import { AddContactsToCampaignInput } from './dto/add-contacts-to-campaign.input';

@Resolver(() => Campaign)
export class CampaignsResolver {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Query(() => Campaign)
  @UseGuards(JwtAuthGuard)
  getCampaign(
    @Args('id') id: string,
    @Context() context: { req: { user: JwtPayload } },
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.findById(id, userId);
  }

  @Mutation(() => Campaign)
  @UseGuards(JwtAuthGuard)
  createCampaign(
    @Args('input') input: CreateCampaignInput,
    @Context() context: { req: { user: JwtPayload } },
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.createCampaign(input, userId);
  }

  @Mutation(() => Campaign)
  @UseGuards(JwtAuthGuard)
  addContactsToCampaign(
    @Args('input') input: AddContactsToCampaignInput,
    @Context() context: { req: { user: JwtPayload } },
  ) {
    const userId = context.req.user.sub;
    return this.campaignsService.addContacts(input, userId);
  }
}
