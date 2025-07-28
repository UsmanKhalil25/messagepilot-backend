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
import { ContactMethodType } from './enums/contact-method-type.enum';

@Entity()
@Unique(['type', 'value'])
export class ContactMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ContactMethodType,
  })
  type: ContactMethodType;

  @Column()
  value: string;

  @ManyToOne(() => Contact, (contact) => contact.contactMethods)
  contact: Contact;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
