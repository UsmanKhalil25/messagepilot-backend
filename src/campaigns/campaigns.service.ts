import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { CampaignStatus } from './enums/campaign-status.enum';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { Campaign } from './campaign.entity';
import { Contact } from 'src/contacts/contact.entity';
import { User } from 'src/users/user.entity';
import { AddContactsToCampaignInput } from './dto/add-contacts-to-campaign.input';

const CREATABLE_CAMPAIGN_STATUSES = [
  CampaignStatus.DRAFT,
  CampaignStatus.QUEUED,
];

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignsRepository: Repository<Campaign>,
  ) {}

  async createCampaign(
    input: CreateCampaignInput,
    userId: string,
  ): Promise<Campaign> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!input.title?.trim()) {
      throw new BadRequestException('Campaign title is required');
    }

    if (!input.description.trim()) {
      throw new BadRequestException('Campaign description is required');
    }

    if (input.status && !CREATABLE_CAMPAIGN_STATUSES.includes(input.status)) {
      throw new BadRequestException(
        `Invalid status "${input.status}" for campaign creation. Only "draft" and "queued" are allowed.`,
      );
    }
    return await this.campaignsRepository.manager.transaction(
      async (manager) => {
        try {
          const user = await manager.findOne(User, { where: { id: userId } });
          if (!user) {
            throw new NotFoundException('User not found');
          }

          const campaign = manager.create(Campaign, {
            title: input.title.trim(),
            description: input.description?.trim(),
            channelType: input.channelType,
            status: input.status ?? CampaignStatus.DRAFT,
            user,
          });

          const savedCampaign = await manager.save(campaign);

          const campaignWithRelations = await manager.findOne(Campaign, {
            where: { id: savedCampaign.id },
            relations: ['user', 'contacts', 'contacts.contactChannels'],
          });

          if (!campaignWithRelations) {
            throw new InternalServerErrorException(
              'Failed to reload campaign with relations',
            );
          }

          return campaignWithRelations;
        } catch (error) {
          if (
            error instanceof NotFoundException ||
            error instanceof BadRequestException
          ) {
            throw error;
          }

          throw new InternalServerErrorException(
            'Failed to create campaign',
            error instanceof Error ? error.message : String(error),
          );
        }
      },
    );
  }

  async addContacts(
    input: AddContactsToCampaignInput,
    userId: string,
  ): Promise<Campaign> {
    const { campaignId, contactIds } = input;

    if (!campaignId || !contactIds?.length || !userId) {
      throw new BadRequestException(
        'Campaign ID, Contact IDs, and User ID are required',
      );
    }

    return await this.campaignsRepository.manager.transaction(
      async (manager) => {
        try {
          const campaign = await manager.findOne(Campaign, {
            where: { id: campaignId, user: { id: userId } },
            relations: ['contacts', 'user'],
          });

          if (!campaign) {
            throw new NotFoundException(
              'Campaign not found or not accessible by user',
            );
          }

          const contacts = await manager.find(Contact, {
            where: { id: In(contactIds) },
            relations: ['contactChannels'],
          });

          if (contacts.length !== contactIds.length) {
            throw new NotFoundException('Some contacts were not found');
          }

          const existingIds = new Set(campaign.contacts.map((c) => c.id));
          const newContacts = contacts.filter((c) => !existingIds.has(c.id));

          campaign.contacts = [...campaign.contacts, ...newContacts];

          const savedCampaign = await manager.save(campaign);

          const campaignWithRelations = await manager.findOne(Campaign, {
            where: { id: savedCampaign.id },
            relations: ['user', 'contacts', 'contacts.contactChannels'],
          });

          if (!campaignWithRelations) {
            throw new InternalServerErrorException(
              'Failed to reload campaign with relations',
            );
          }

          return campaignWithRelations;
        } catch (error) {
          if (
            error instanceof NotFoundException ||
            error instanceof BadRequestException
          ) {
            throw error;
          }

          throw new InternalServerErrorException(
            'Failed to associate contacts with campaign',
            error instanceof Error ? error.message : String(error),
          );
        }
      },
    );
  }

  async findById(campaignId: string, userId: string): Promise<Campaign> {
    if (!campaignId) {
      throw new BadRequestException('Campaign ID is required');
    }

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    try {
      const campaign = await this.campaignsRepository.findOne({
        where: {
          id: campaignId,
          user: { id: userId },
        },
        relations: ['user', 'contacts', 'contacts.contactChannels'],
      });

      if (!campaign) {
        throw new NotFoundException(
          `Campaign with ID ${campaignId} not found or you don't have permission to access it`,
        );
      }

      return campaign;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to retrieve campaign',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
