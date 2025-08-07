import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { CampaignChannel } from './enums/campaign-channel.enum';
import { CampaignStatus } from './enums/campaign-status.enum';
import { Contact } from 'src/contacts/contact.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: CampaignChannel,
  })
  channelType: CampaignChannel;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @ManyToMany(() => Contact, (contact) => contact.campaigns)
  @JoinTable()
  contacts: Contact[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
