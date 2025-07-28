import { ContactMethod } from 'src/contact-methods/contact-method.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Campaign } from 'src/campaigns/campaign.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ContactMethod, (contactMethod) => contactMethod.contact)
  contactMethods: ContactMethod[];

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToMany(() => Campaign, (campaign) => campaign.contacts)
  campaigns: Campaign[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
