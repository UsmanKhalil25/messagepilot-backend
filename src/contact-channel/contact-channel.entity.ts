import { Contact } from 'src/contacts/contact.entity';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { ContactType } from './enums/contact-type.enum';

@Entity()
@Unique(['type', 'value'])
export class ContactChannel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ContactType,
  })
  type: ContactType;

  @Column()
  value: string;

  @ManyToOne(() => Contact, (contact) => contact.contactChannels)
  contact: Contact;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
