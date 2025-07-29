import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsService, ContactsResolver],
})
export class ContactsModule {}
